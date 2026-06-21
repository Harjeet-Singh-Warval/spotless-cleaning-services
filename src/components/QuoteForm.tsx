import React, { useState, useEffect } from "react";
import { Sparkles, Calculator, Check, AlertCircle, RefreshCw, ClipboardCheck, Mail, Calendar } from "lucide-react";
import { QuoteRequest, QuoteBreakdown } from "../types";

export default function QuoteForm() {
  const [serviceType, setServiceType] = useState("home");
  const [sqft, setSqft] = useState(1500);
  const [rooms, setRooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [frequency, setFrequency] = useState("biweekly");

  // Client info form states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  const [localEstimate, setLocalEstimate] = useState<QuoteBreakdown | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Instantly calculate prices locally for responsive previewing
  const calculateLocalEstimate = () => {
    let basePrice = 90;
    switch (serviceType) {
      case "deep":
        basePrice = 160;
        break;
      case "commercial":
        basePrice = 240;
        break;
      case "move_out":
        basePrice = 220;
        break;
      case "carpet":
        basePrice = 110;
        break;
      case "home":
      default:
        basePrice = 90;
        break;
    }

    const sqftRate = serviceType === "commercial" ? 0.15 : 0.10;
    const sqftCost = sqft * sqftRate;
    const roomsCost = (rooms * 25) + (bathrooms * 35);
    const subtotal = basePrice + sqftCost + roomsCost;

    let discountPercent = 0;
    if (frequency === "weekly") discountPercent = 20;
    else if (frequency === "biweekly") discountPercent = 15;
    else if (frequency === "monthly") discountPercent = 10;

    const discountAmount = (subtotal * discountPercent) / 100;
    const total = Math.max(40, subtotal - discountAmount);

    setLocalEstimate({
      basePrice,
      sqftCost,
      roomsCost,
      subtotal,
      discountPercent,
      discountAmount,
      total,
    });
  };

  useEffect(() => {
    calculateLocalEstimate();
  }, [serviceType, sqft, rooms, bathrooms, frequency]);

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim() || !clientAddress.trim() || !preferredDate) {
      setFormError("Please fill out all required contact fields and choose a preferred date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: QuoteRequest = {
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
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Server responded with a pricing or capture error.");
      }

      const data = await response.json();
      setSuccessResponse(data);
    } catch (err: any) {
      console.error("Booking submission error:", err);
      setFormError("The booking dispatcher is temporarily offline. Please call us directly (800) 555-0199 or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSuccessResponse(null);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setClientAddress("");
    setPreferredDate("");
    setSpecialNotes("");
  };

  return (
    <section id="quote-calculator" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Calculator & Booking
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-slate-900 mt-4 leading-tight">
            Calculate Your Price, Book Instantly
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base">
            No guessing games, no waiting for slow call-backs. Drag the indicators to see our transparent costing structure, then book instantly online.
          </p>
        </div>

        {successResponse ? (
          // Success Response State Card
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border-2 border-emerald-400/30 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-950 font-sans">
              Booking Request Submitted!
            </h3>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-lg mx-auto">
              {successResponse.clientMessage}
            </p>

            {/* Price breakdown confirmation card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 my-6 text-left max-w-md mx-auto">
              <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-200 pb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-sky-600" />
                Quote Calculation Breakdown:
              </h4>
              <div className="space-y-2 mt-3 text-xs md:text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Base Booking Service Charge:</span>
                  <span>${successResponse.breakdown.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sq. Footage Coverage Adjustment:</span>
                  <span>${successResponse.breakdown.sqftCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rooms count fee (${rooms} Bedroom & {bathrooms} Bathroom):</span>
                  <span>${successResponse.breakdown.roomsCost.toFixed(2)}</span>
                </div>
                {successResponse.breakdown.discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Frequency Discount ({successResponse.breakdown.discountPercent}%):</span>
                    <span>-${successResponse.breakdown.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 border-t border-slate-200 pt-2 font-black text-base">
                  <span>Estimated Total (Pending Walk-through):</span>
                  <span className="text-sky-600">${successResponse.breakdown.total.toFixed(2)}/clean</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition-all text-sm cursor-pointer"
              >
                Estimate Another Cleaning
              </button>
              <a
                href="tel:+18005550199"
                className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all text-sm cursor-pointer"
              >
                Call to Confirm Speedily
              </a>
            </div>
          </div>
        ) : (
          /* Normal interactive state */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Parameters form: 7 columns */}
            <form onSubmit={handleSubmitBooking} className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 space-y-8">
              {/* Step 1: Service Type Toggle */}
              <div>
                <h3 className="font-sans font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                  <span className="w-6 h-6 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-black">1</span>
                  Select Type of Cleaning Service
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                  {[
                    { id: "home", label: "Standard" },
                    { id: "deep", label: "Deep" },
                    { id: "commercial", label: "Office" },
                    { id: "move_out", label: "Move" },
                    { id: "carpet", label: "Carpet" },
                  ].map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setServiceType(service.id)}
                      className={`py-3.5 px-2 text-xs md:text-sm font-bold rounded-2xl border text-center transition-all cursor-pointer ${
                        serviceType === service.id
                          ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-100"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-350"
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Sizing parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Square Footage Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-sans font-bold text-slate-800 flex items-center gap-2 text-sm md:text-base">
                      <span className="w-6 h-6 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-black">2</span>
                      Property Size
                    </h3>
                    <span className="bg-sky-50 text-sky-700 font-black text-xs md:text-sm px-2.5 py-0.5 rounded-md">
                      {sqft.toLocaleString()} sq. ft.
                    </span>
                  </div>

                  <input
                    type="range"
                    min="500"
                    max="8000"
                    step="50"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                    <span>500 sqft</span>
                    <span>3,500 sqft</span>
                    <span>8,000 sqft</span>
                  </div>
                </div>

                {/* Rooms Adjustment increments */}
                <div className="space-y-4">
                  {/* Bedrooms */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-bold text-slate-750">Rooms/Bedrooms:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 cursor-pointer text-center text-sm"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-slate-800">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(Math.min(15, rooms + 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 cursor-pointer text-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-bold text-slate-750">Bathrooms:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 cursor-pointer text-center text-sm"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-slate-800">{bathrooms}</span>
                      <button
                        type="button"
                        onClick={() => setBathrooms(Math.min(10, bathrooms + 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 cursor-pointer text-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Frequency choice */}
              <div>
                <h3 className="font-sans font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                  <span className="w-6 h-6 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-black">3</span>
                  How Often Should We Clean?
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: "weekly", label: "Weekly", desc: "Save 20%" },
                    { id: "biweekly", label: "Bi-Weekly", desc: "Save 15%" },
                    { id: "monthly", label: "Monthly", desc: "Save 10%" },
                    { id: "once", label: "One-Time", desc: "Standard" },
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => setFrequency(freq.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        frequency === freq.id
                          ? "bg-sky-600 text-white border-sky-600 shadow-md"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-350"
                      }`}
                    >
                      <p className="font-bold text-xs md:text-sm">{freq.label}</p>
                      <p className={`text-[9px] mt-0.5 ${frequency === freq.id ? "text-sky-100" : "text-sky-600 font-semibold"}`}>
                        {freq.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Booking Details */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="font-sans font-bold text-slate-800 flex items-center gap-2 text-sm md:text-base">
                  <span className="w-6 h-6 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-black">4</span>
                  Your Information Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 leading-snug">Full Name *</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                      placeholder="e.g. Sarah Connor"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 leading-snug">Email Address *</label>
                    <input
                      type="email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                      placeholder="e.g. sarah@domain.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 leading-snug">Phone Number *</label>
                    <input
                      type="tel"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                      placeholder="e.g. (555) 019-9000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                    />
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 leading-snug">Preferred Booking Day *</label>
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 leading-snug">Physical Address *</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                    placeholder="Street, City, State ZIP Code"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    required
                  />
                </div>

                {/* Special Instructs */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 leading-snug">Special Instructions (Optional)</label>
                  <textarea
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                    placeholder="e.g. We have two dogs; gate access code is #404. Focus on master shower tile scale please!"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                  />
                </div>
              </div>

              {formError && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3 text-rose-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-200 text-white font-extrabold rounded-2xl shadow-xl shadow-sky-100 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm md:text-base hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Processing Calculation...</span>
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="w-5 h-5 animate-pulse" />
                    <span>Submit Free Booking Estimate</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Estimator Card output: 5 columns */}
            <div className="lg:col-span-12 xl:col-span-5 lg:order-last">
              <div className="bg-gradient-to-tr from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative sticky top-24">
                <div className="absolute top-4 right-4 bg-white/10 p-2.5 rounded-2xl backdrop-blur-xs text-white">
                  <Calculator className="w-6 h-6 text-sky-300" />
                </div>

                <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full tracking-wider">
                  Live Estimate Breakdown
                </span>

                <h3 className="font-sans font-black text-2xl mt-4 text-white">
                  Estimate Summary
                </h3>

                {localEstimate && (
                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between text-sm text-sky-200 border-b border-white/10 pb-3">
                      <span>Service Package:</span>
                      <span className="text-white font-black capitalize">{serviceType === "home" ? "Standard" : serviceType}</span>
                    </div>

                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Base service setup:</span>
                      <span className="text-white font-semibold">${localEstimate.basePrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Area fee ({sqft} sqft):</span>
                      <span className="text-white font-semibold">${localEstimate.sqftCost.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Rooms fee ({rooms}R / {bathrooms}B):</span>
                      <span className="text-white font-semibold">${localEstimate.roomsCost.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-xs text-slate-300 border-b border-white/10 pb-3">
                      <span>Standard subtotal:</span>
                      <span className="text-white font-semibold">${localEstimate.subtotal.toFixed(2)}</span>
                    </div>

                    {localEstimate.discountPercent > 0 && (
                      <div className="flex justify-between text-sm text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded-xl">
                        <span>Frequency discount ({localEstimate.discountPercent}%):</span>
                        <span>-${localEstimate.discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-4">
                      <p className="text-[10px] uppercase text-sky-300 font-bold tracking-widest">Calculated amount</p>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-4xl md:text-5xl font-sans font-black tracking-tight text-white">
                          ${localEstimate.total.toFixed(2)}
                        </span>
                        <span className="text-xs text-sky-200 font-semibold capitalize">/ {frequency === "once" ? "clean" : frequency}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-2 leading-relaxed">
                        * Note: This is an estimated starting price. Final quote is confirmed by phone or during dispatch walkthrough.
                      </p>
                    </div>
                  </div>
                )}

                {/* Trust mini block */}
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-350">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Pet Safe Solvent</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-350">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Insured Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
