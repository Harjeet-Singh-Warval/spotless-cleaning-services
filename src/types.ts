export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  pricingInfo: string;
  badge?: string;
  bullets: string[];
}

export interface TrustBadgeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface QuoteRequest {
  serviceType: string;
  sqft: number;
  rooms: number;
  bathrooms: number;
  frequency: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  preferredDate: string;
  specialNotes?: string;
}

export interface QuoteBreakdown {
  basePrice: number;
  sqftCost: number;
  roomsCost: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  photoUrl: string;
  companyName?: string;
}

export interface ChatMessage {
  role: "user" | "model" | "assistant";
  text: string;
  timestamp: string;
}
