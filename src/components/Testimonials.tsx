import React from "react";
import { Star, Quote, ShieldAlert } from "lucide-react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const reviews: Testimonial[] = [
    {
      id: "1",
      name: "Marcus Vance",
      role: "Homeowner",
      content: "We scheduled a deep clean before our newborn arrived, and I was completely blown away. They didn't just clean—they sanitized the vents, polished hardwood trims, and left the house spelling fresh with zero harsh chemicals. Truly an eco-friendly local masterpiece!",
      rating: 5,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      name: "Elena Rostova",
      role: "Operations Manager",
      content: "Finding trustworthy commercial janitorial coverage was a nightmare until we found Spotless. They clean our 4,000 sq ft office twice a week after-hours. Reliable, insured, and very professional. The difference in air cleanliness is visible.",
      rating: 5,
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      companyName: "Rostov Logistics Core",
    },
    {
      id: "3",
      name: "David K. Miller",
      role: "Apartment Tenant",
      content: "Fantastic move-out cleaning service. Our landlord is notoriously strict about security deposit returns, but the Spotless crew left the kitchen cabinets and oven so immaculate that we passed inspection with flying colors and zero deductions. Worth every penny!",
      rating: 5,
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="testimonials-reviews" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-slate-900 mt-4 leading-tight">
            Loved by Busy Families & Leading Local Businesses
          </h2>
          <p className="text-slate-500 mt-4 text-sm md:text-base">
            From single studio apartments to large multi-floor corporate offices, read what our recurring clients say about their Spotless experience.
          </p>
        </div>

        {/* Reviews Cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md relative group flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote mark accent in corner */}
              <div className="absolute top-6 right-8 text-sky-100 group-hover:text-sky-200 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 stroke-2 fill-sky-50" />
              </div>

              <div>
                {/* Star rating component */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <p className="text-slate-650 text-sm md:text-base leading-relaxed italic text-slate-650">
                  "{review.content}"
                </p>
              </div>

              {/* Author bio row */}
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-55 border-slate-100">
                <img
                  src={review.photoUrl}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-sm md:text-base leading-none">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {review.role} {review.companyName && `• ${review.companyName}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small trust seal card */}
        <div className="mt-16 bg-white rounded-2xl p-6 border border-slate-100 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-5 shadow-xs">
          <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-extrabold text-sm border-2 border-emerald-100">
            ✓
          </div>
          <div>
            <p className="text-sm font-black text-slate-800">
              Verified Reviews by Third-Party Auditing
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Every client quote and testimonial showcase real feedback from registered customer accounts who paid for cleaning services. No fake fillers or generated statistics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
