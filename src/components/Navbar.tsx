import React, { useState, useEffect } from "react";
import { Sparkles, Phone, Menu, X, CalendarCheck2 } from "lucide-react";

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
      const offset = 80; // height of sticking header
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
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
          : "bg-white/90 backdrop-blur-xs py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Name */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-100 group-hover:rotate-6 transition-transform duration-150">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-sans font-extrabold text-lg md:text-xl text-slate-900 tracking-tight block">
              Spotless
            </span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block -mt-1.5">
              Cleaning Services
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(link.targetId)}
              className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors pointer-events-auto cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action icons & buttons */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Click to call details */}
          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-sky-50 hover:text-sky-700 p-2 px-3 rounded-full border border-slate-100 transition-all cursor-pointer"
            id="nav-phone-contact"
          >
            <Phone className="w-4 h-4 text-sky-600 shrink-0" />
            <span>(800) 555-0199</span>
          </a>

          <button
            onClick={() => handleNavClick("quote-calculator")}
            className="flex items-center gap-1.5 text-sm font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-full p-2 px-4 shadow-lg shadow-sky-100 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <CalendarCheck2 className="w-4 h-4" />
            Get Free Quote
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 sm:hidden">
          <a
            href="tel:+18005550199"
            className="p-2 w-10 h-10 bg-sky-50 text-sky-600 border border-sky-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-sky-100"
            aria-label="Call Support Phone Line"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav screen overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-[65px] inset-x-0 bg-white border-b border-slate-100 shadow-xl p-6 transition-all duration-300">
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
                className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 font-bold text-slate-800 hover:bg-sky-50 hover:text-sky-700 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                (800) 555-0199
              </a>
              <button
                onClick={() => handleNavClick("quote-calculator")}
                className="flex items-center justify-center gap-2 p-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-500 shadow-lg cursor-pointer"
              >
                <CalendarCheck2 className="w-5 h-5" />
                Book Instant Calculator
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
