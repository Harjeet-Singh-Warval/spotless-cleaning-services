import React from "react";
import { Sparkles, CalendarCheck2, BadgeCheck, Star } from "lucide-react";

export default function Hero() {
  const heroBgImage = "/src/assets/images/hero_clean_home_1782033285007.jpg";

  const handleScrollToQuote = () => {
    const element = document.getElementById("quote-calculator");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const trustBadges = [
    "Fully Insured & Bonded",
    "Pet-Safe Eco-Friendly",
    "100% Satisfaction Guarantee",
    "Background-Checked Cleaners",
  ];

  return (
    <header className="relative pt-24 pb-16 md:py-32 xl:py-40 bg-slate-50 overflow-hidden flex items-center min-h-[90vh]">
      {/* Background graphic layout */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent lg:z-10" />
        <img
          src={heroBgImage}
          alt="Spotless clean, bright modern living room designed by premium housekeeping service"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Absolute statistics overlay (floating badge) */}
        <div className="absolute bottom-8 right-6 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 z-20">
          <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
            <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <p className="text-slate-900 font-extrabold text-sm">4.9/5 Star Rating</p>
            <p className="text-[11px] text-slate-500">Based on 1,800+ local reviews</p>
          </div>
        </div>
      </div>

      {/* Hero content container */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-15 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          {/* Trust badge tag */}
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 py-1.5 px-3.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-sky-100">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            Voted Metro's Best Cleaning Service
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-slate-900 leading-[1.1]">
            Spotless Homes, <br />
            <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-500">
              Stress-Free Living
            </span>
          </h1>

          <p className="text-slate-600 mt-5 text-lg md:text-xl leading-relaxed">
            Our vetted, background-checked crew delivers carbon-neutral cleaning — insured and 100% satisfaction guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={handleScrollToQuote}
              className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-bold shadow-xl shadow-sky-100 text-center flex items-center justify-center gap-2.5 group transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              <CalendarCheck2 className="w-5 h-5" />
              <span>Get a Free Quote</span>
            </button>

            <a
              href="tel:+18005550199"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl font-bold text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              id="hero-call-to-action"
            >
              <span>Call (800) 555-0199</span>
            </a>
          </div>

          {/* Trust badges — single horizontal row under CTAs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs"
              >
                <BadgeCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
