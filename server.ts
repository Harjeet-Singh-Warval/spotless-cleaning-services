import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Lazy-initialized Gemini API client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Chat helper will run in mock mode.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. Chat with Gemini API (for Live Chat Customer Support)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback for local development if key is missing
      res.json({
        text: `Hello! I'm the Spotless Cleaning Services assistant. (Note: Server is currently running in trial mode without an active Gemini key). We would love to clean your space! We offer:
- Primary Home Cleaning starting from $120
- High Efficiency Commercial & Deep Cleaning
- 100% Satisfaction Guarantee and Eco-friendly checkups.

How can I help you book today?`,
      });
      return;
    }

    // Prepare system instructions for Spotless Cleaning Services brand
    const systemInstruction = `You are a warm, professional, reassuring, and highly skilled customer care virtual assistant for "Spotless Cleaning Services".
Your primary goal is to answer client questions about cleaning services, build trust, and gently guide them to fill out our Quote/Booking Form.

Key trust points to mention naturally:
- Fully Insured & Bonded for complete peace of mind.
- We use 100% Eco-Friendly and non-toxic cleaning products (safe for pets & kids).
- 100% Satisfaction Guarantee: If they aren't fully satisfied, we'll re-clean within 24 hours for free.
- Every single crew member is background-checked, vetted, and professionally trained.

Operating guidelines:
- Be polite, clean, welcoming, and crisp. Use bullet points for structural clarity when explaining services.
- Services we offer: Home Cleaning, Deep Cleaning, Office/Commercial Cleaning, Move-In/Move-Out Cleaning, and Carpet/Upholstery Cleaning.
- If asked about pricing, let them know prices vary based on square footage and rooms, starting from roughly $120. Suggest filling out our "Instant Quote" form on the page for a customized price breakdown in seconds.
- Answer user questions shortly and beautifully. Keep responses under 3 paragraphs. Do not use markdown headers larger than ###. Do not include engineering details.`;

    // Map history to GoogleGenAI expected structure if provided
    const chatConfig: any = {
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    };

    if (history && history.length > 0) {
      // Configure with history if format matches
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: history.map((h: any) => ({
          role: h.role,
          parts: [{ text: h.text }],
        })),
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } else {
      // Direct prompt
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          { role: "system", parts: [{ text: systemInstruction }] },
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          temperature: 0.7,
        }
      });
      res.json({ text: response.text });
    }
  } catch (error: any) {
    console.error("Gemini API Error in server.ts:", error);
    res.status(500).json({
      error: "Error processing chat message",
      message: error.message || String(error),
    });
  }
});

// 3. Estimate cost & submit booking (Mock Email Trigger)
app.post("/api/quote", (req, res) => {
  try {
    const {
      serviceType,
      sqft,
      rooms,
      bathrooms,
      frequency,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      preferredDate,
      specialNotes,
    } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !serviceType) {
      res.status(400).json({ error: "Missing required booking details (Name, Email, Phone, and Service Type)." });
      return;
    }

    // Pricing calculation
    const numericSqft = Number(sqft) || 1200;
    const numericRooms = Number(rooms) || 2;
    const numericBaths = Number(bathrooms) || 1;

    let basePrice = 90;
    let serviceLabel = "Standard Home Cleaning";

    switch (serviceType) {
      case "deep":
        basePrice = 160;
        serviceLabel = "Deep Premium Cleaning";
        break;
      case "commercial":
        basePrice = 240;
        serviceLabel = "Office & Commercial Cleaning";
        break;
      case "move_out":
        basePrice = 220;
        serviceLabel = "Move-In / Move-Out Cleaning";
        break;
      case "carpet":
        basePrice = 110;
        serviceLabel = "Carpet & Upholstery Cleaning";
        break;
      case "home":
      default:
        basePrice = 90;
        serviceLabel = "Standard Home Cleaning";
        break;
    }

    // Detailed math
    const sqftRate = serviceType === "commercial" ? 0.15 : 0.10;
    const sqftCost = numericSqft * sqftRate;
    const roomCost = numericRooms * 25;
    const bathCost = numericBaths * 35;
    const absoluteSubtotal = basePrice + sqftCost + roomCost + bathCost;

    let discountPercent = 0;
    let frequencyLabel = "One-Time Service";

    if (frequency === "weekly") {
      discountPercent = 20;
      frequencyLabel = "Weekly (20% Off)";
    } else if (frequency === "biweekly") {
      discountPercent = 15;
      frequencyLabel = "Bi-Weekly (15% Off)";
    } else if (frequency === "monthly") {
      discountPercent = 10;
      frequencyLabel = "Monthly (10% Off)";
    }

    const discountAmount = (absoluteSubtotal * discountPercent) / 100;
    const finalTotal = Math.round((absoluteSubtotal - discountAmount) * 100) / 100;

    // Simulation of sending emails to:
    // 1. Spotless Cleaning Services staff (bookings@spotlesshq.com)
    // 2. Client (recipient clientEmail)
    const simulatedEmailId = `msg_` + Math.random().toString(36).substring(2, 10);
    const notificationTimestamp = new Date().toLocaleString();

    const companyEmailTemplate = `
      =========================================
      [ADMIN NOTIFICATION] NEW CLEANING BOOKING REQUEST
      =========================================
      Received: ${notificationTimestamp}
      ID: ${simulatedEmailId}
      
      CLIENT INFO:
      - Name:    ${clientName}
      - Email:   ${clientEmail}
      - Phone:   ${clientPhone}
      - Address: ${clientAddress || "Not specified"}
      
      SERVICE REQUESTED:
      - Service:   ${serviceLabel} (${serviceType})
      - Area:      ${numericSqft} sq. ft.
      - Bedrooms:  ${numericRooms}
      - Bathrooms: ${numericBaths}
      - Schedule:  ${frequencyLabel}
      - Pref Date: ${preferredDate || "As soon as possible"}
      
      PRICING ESTIMATION:
      - Base charge:  $${basePrice.toFixed(2)}
      - Size charge:  $${sqftCost.toFixed(2)}
      - Rooms adjustment: $${(roomCost + bathCost).toFixed(2)}
      - Discount applied: ${discountPercent}% (-$${discountAmount.toFixed(2)})
      - ESTIMATED TOTAL: $${finalTotal.toFixed(2)}
      
      CLIENT NOTES: 
      "${specialNotes || "No notes provided."}"
      =========================================
    `;

    const clientEmailTemplate = `
      Subject: Thank you for choosing Spotless Cleaning Services! 🌟
      Dear ${clientName},
      
      We have received your estimate and booking inquiry! Our cleaning coordinator is already reviewing your details.
      
      SUMMARY OF ESTIMATE:
      - Service:      ${serviceLabel}
      - Appointment:  ${preferredDate || "Our team will schedule with you"}
      - Address:      ${clientAddress}
      - Estimated Total: $${finalTotal.toFixed(2)} (pending actual walk-through confirmation)
      
      We will call or email you at ${clientPhone} within the hour to finalize your time slot!
      
      Warm regards,
      The Spotless Cleaning Team
    `;

    // Write logs to simulate actual SMTP relays
    console.log("----------------------------------------");
    console.log("SIMULATING EMAIL DISPATCH SUCCEEDED:");
    console.log("To: bookings@spotlesshq.com & " + clientEmail);
    console.log(companyEmailTemplate);
    console.log("----------------------------------------");

    res.json({
      success: true,
      emailSent: true,
      emailId: simulatedEmailId,
      estimatedCost: finalTotal,
      breakdown: {
        basePrice,
        sqftCost,
        roomsCost: roomCost + bathCost,
        subtotal: absoluteSubtotal,
        discountPercent,
        discountAmount,
        total: finalTotal,
      },
      clientMessage: `Thank you, ${clientName}! An instant quote summary of $${finalTotal.toFixed(2)} was computed and our system successfully sent a confirmation email notification to ${clientEmail}. Our scheduler will contact you shortly to finalize your booking!`,
    });
  } catch (error: any) {
    console.error("Error in quote server endpoint:", error);
    res.status(500).json({ error: "Failed to calculate quote or process dispatch." });
  }
});

// Configure Vite middleware or production static site
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
