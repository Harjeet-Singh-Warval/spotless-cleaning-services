import React from "react";
import { Sparkles, Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
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

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
        {/* Brand details Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-sans font-black text-white text-base tracking-tight block">
                Spotless
              </span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block -mt-1.5">
                Cleaning Services
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Leading the ecological cleaning industry since 2018. Delivering high-contrast sparkling homes and trusted commercial facilities across the core metro suburbs. Fully Bonded & Insured.
          </p>

          {/* Social Icons row */}
          <div className="flex items-center gap-3 pt-4">
            <a href="#" className="p-2 bg-slate-800 hover:bg-sky-600 hover:text-white rounded-xl transition-colors cursor-pointer text-slate-300" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-sky-500 hover:text-white rounded-xl transition-colors cursor-pointer text-slate-300" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-rose-600 hover:text-white rounded-xl transition-colors cursor-pointer text-slate-300" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-sky-700 hover:text-white rounded-xl transition-colors cursor-pointer text-slate-300" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Business Operational Hours Column */}
        <div>
          <h3 className="font-sans font-bold text-white text-sm uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            Operating Hours
          </h3>
          <ul className="space-y-3 text-xs md:text-sm text-slate-300">
            <li className="flex items-center justify-between">
              <span>Monday – Friday:</span>
              <span className="text-white font-semibold">7:00 AM – 8:00 PM</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Saturday Spotlights:</span>
              <span className="text-white font-semibold">8:00 AM – 6:00 PM</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Sunday Emergencies:</span>
              <span className="text-sky-400 font-extrabold text-xs">9:00 AM – 4:00 PM</span>
            </li>
            <li className="flex items-start gap-1 pb-1 pt-1.5 text-[11px] text-slate-400 border-t border-slate-800">
              <Clock className="w-3.5 h-3.5 inline text-sky-500 shrink-0 mt-0.5" />
              <span>Emergency after-hour commercial dispatches available under Contract.</span>
            </li>
          </ul>
        </div>

        {/* Covered Districts Column */}
        <div>
          <h3 className="font-sans font-bold text-white text-sm uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            Service Coverage Areas
          </h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5" onClick={() => handleNavClick("service-map-zone")}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Downtown & Center Metro Core
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5" onClick={() => handleNavClick("service-map-zone")}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Northside Suburbs & Residential
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5" onClick={() => handleNavClick("service-map-zone")}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Westwood Peaks & Gated communities
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5" onClick={() => handleNavClick("service-map-zone")}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              East Coast Bay & Retail Strip
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5" onClick={() => handleNavClick("service-map-zone")}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Oakridge Valley & South District
            </li>
          </ul>
        </div>

        {/* Direct Contacts Column */}
        <div>
          <h3 className="font-sans font-bold text-white text-sm uppercase tracking-widest border-b border-slate-800 pb-3 mb-4">
            Direct Contacts
          </h3>
          <ul className="space-y-3 text-xs md:text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <a href="tel:+18005550199" className="text-white font-bold hover:text-sky-300 transition-colors">
                  (800) 555-0199
                </a>
                <p className="text-[10px] text-slate-400 mt-0.5">Toll-free customer scheduler</p>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <a href="mailto:bookings@spotlesshq.com" className="text-white hover:text-sky-300 transition-colors">
                  bookings@spotlesshq.com
                </a>
                <p className="text-[10px] text-slate-400 mt-0.5">Custom layout requests</p>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Headquarters</p>
                <p className="text-slate-300 text-xs">742 Evergreen Terrace, Suite 100</p>
                <p className="text-slate-300 text-xs">Core Metro City, MC 90210</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Under footer */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {currentYear} Spotless Cleaning Services LLC. All rights or warranties reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-slate-350 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-350 transition-colors">Terms of Operations</a>
          <a href="#" className="hover:text-slate-350 transition-colors">General Disclaimers</a>
        </div>
      </div>
    </footer>
  );
}
