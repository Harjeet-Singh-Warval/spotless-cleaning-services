import React, { useState, useEffect } from "react";
import { Sparkles, Phone, Menu, X, CalendarCheck2, Languages, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // height of floating header + top spacing
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

  const navLinks = [
    { label: "Services", targetId: "services" },
    { label: "Why Choose Us", targetId: "why-us" },
    { label: "Transformations", targetId: "transformation-gallery" },
    { label: "Booking Quote", targetId: "quote-calculator" },
    { label: "Area Map", targetId: "service-map-zone" },
    { label: "Reviews", targetId: "testimonials-reviews" },
    { label: "About Us", targetId: "about-story" },
  ];

  return (
    <nav className="fixed top-0 sm:top-4 inset-x-0 z-45 flex justify-center px-0 sm:px-6 w-full pointer-events-none transition-all duration-300">
      <div
        className={`relative w-full max-w-7xl border border-slate-200/50 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "py-2.5 px-6 backdrop-blur-lg bg-white/90 shadow-lg shadow-slate-100/40"
            : "py-3.5 px-6 backdrop-blur-md bg-white/75 shadow-md shadow-slate-100/20"
        } rounded-none sm:rounded-full`}
      >
        {/* Logo and Name */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-md shadow-slate-950/15 group-hover:rotate-6 transition-transform duration-150 shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black text-sm md:text-base text-slate-900 tracking-tight block leading-none">
              Spotless
            </span>
            <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider block mt-0.5 leading-none">
              Cleaning Services
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(link.targetId)}
              className="text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-50/80 px-3.5 py-2 rounded-full transition-all duration-150 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action icons & buttons */}
        <div className="hidden sm:flex items-center gap-4.5">
          {/* Click to call details */}
          <a
            href="tel:+18005550199"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-650 hover:text-sky-600 transition-colors cursor-pointer"
            id="nav-phone-contact"
          >
            <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>(800) 555-0199</span>
          </a>

          {/* Decorative/Functional Language selector to match UI */}
          <div className="flex items-center gap-1 text-slate-650 hover:text-slate-900 transition-colors cursor-pointer select-none font-bold text-xs">
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <button
            onClick={() => handleNavClick("quote-calculator")}
            className="flex items-center gap-1.5 text-xs font-extrabold bg-slate-950 hover:bg-slate-800 text-white rounded-full py-2.5 px-5 transition-all cursor-pointer shadow-md shadow-slate-950/10 hover:-translate-y-0.5"
          >
            Get Free Quote
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+18005550199"
            className="p-2 w-9 h-9 bg-sky-50 text-sky-600 border border-sky-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-100"
            aria-label="Call Support Phone Line"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav screen overlay */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md border border-slate-150/80 shadow-xl rounded-3xl p-6 transition-all duration-300 z-50 pointer-events-auto">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(link.targetId)}
                  className="text-left py-2 text-base font-bold text-slate-800 hover:text-sky-600 transition-colors pointer-events-auto cursor-pointer"
                >
                  {link.label}
                </button>
              ))}

              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <a
                  href="tel:+18005550199"
                  className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-slate-800 hover:bg-sky-50 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  (800) 555-0199
                </a>
                <button
                  onClick={() => handleNavClick("quote-calculator")}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-lg cursor-pointer"
                >
                  <CalendarCheck2 className="w-5 h-5 text-emerald-450" />
                  Get Free Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
