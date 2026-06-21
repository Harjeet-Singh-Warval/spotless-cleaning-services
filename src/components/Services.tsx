import React, { useState } from "react";
import { Home, Sparkles, Building2, Truck, Sofa, ArrowRight, ShieldCheck, X } from "lucide-react";
import { Service } from "../types";

export default function Services() {
  const [activeModal, setActiveModal] = useState<Service | null>(null);

  const servicesList: Service[] = [
    {
      id: "home",
      title: "Regular Home Cleaning",
      iconName: "Home",
      description: "Keep your living sanctuary consistently fresh. Our custom recurring housekeeping is perfect for busy households needing weekly or bi-weekly resets.",
      pricingInfo: "Starting from $110",
      badge: "Popular Care",
      bullets: [
        "Dusting all surfaces, trims, and wall frames",
        "Vacuuming carpets & mopping hardwood floors",
        "Wiping and sanitizing exterior cabinet doors",
        "Sinks, countertops, and exterior appliance wipe downs",
        "Disinfecting bathrooms (toilet, mirrors, tub & sink)",
        "Emptying trash canisters and replacing bag linings",
      ],
    },
    {
      id: "deep",
      title: "Deep Intensive Cleaning",
      iconName: "Sparkles",
      description: "A comprehensive top-to-bottom scrub designed to restore heavy grime. Recommended for first-time cleans or seasonal spring upkeep.",
      pricingInfo: "Starting from $180",
      badge: "Highest Value",
      bullets: [
        "Detailed hand-scrubbing of vents and light casings",
        "Sanitizing baseboards, door frames, and crown moldings",
        "Interior side window cleaning & sill polishing",
        "Intensive microwave interior, stove grates, and filters",
        "Scrubbing bathroom grout, tile soap scum, and faucets",
        "Full upholstery vacuuming & dust-proofing panels",
      ],
    },
    {
      id: "commercial",
      title: "Office & Commercial Cleaning",
      iconName: "Building2",
      description: "Foster a healthy, productive workspace. We offer reliable janitorial coverage flexible with your commercial hours, insuring a pristine space for employees.",
      pricingInfo: "Starting from $240",
      badge: "Corporate Elite",
      bullets: [
        "Emptying corporate bin lines and heavy recycling bins",
        "Disinfecting high-touch breakroom tables & coffee units",
        "Sanitizing reception desks, computer keyboards, and phones",
        "High-performance lobby entrance and window cleaning",
        "Commercial carpet care and hard-floor power buffing",
        "Fully stocked supply restocking (soap, tissue, towels)",
      ],
    },
    {
      id: "move_out",
      title: "Move-In / Move-Out Cleaning",
      iconName: "Truck",
      description: "Seamless move transitions. Ensure you secure your full security deposit refund or welcome home buyers with a sparkling, sterilized fresh start.",
      pricingInfo: "Starting from $220",
      bullets: [
        "Detailed internal cleaning of empty refrigerator & freezer",
        "Internal cabinet wash and grease extraction",
        "Behind-appliance deep vacuuming (stove, washer, fridge)",
        "Deep scrub of tile soap-scum and shower tracks",
        "Restoring dusty closets, storage units, and baseboards",
        "Vacuuming all cobwebs and closet shelf brackets",
      ],
    },
    {
      id: "carpet",
      title: "Carpet & Upholstery Care",
      iconName: "Sofa",
      description: "Breathe easier with allergen extraction. Hot-water extraction removes deep grease, stains, pet fur, and localized contaminants from fibers.",
      pricingInfo: "Starting from $130",
      bullets: [
        "Eco-friendly organic enzyme pre-treatment for heavy spots",
        "Intense dirt extraction with heated commercial hot-water injectors",
        "Pet odor neutralization & deep fiber conditioning",
        "Upholstery sanitation for sectional couches, chairs, and rugs",
        "Accelerated turbo dehumidified drying techniques",
        "Scotchgard™ textile surface protection treatment",
      ],
    },
  ];

  // Map service icon component dynamically
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="w-6 h-6 text-sky-600" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-sky-600" />;
      case "Sofa":
        return <Sofa className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-600" />;
    }
  };

  const handleBookNowJumper = () => {
    setActiveModal(null);
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

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Specialized Solutions
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-slate-900 mt-4 leading-tight">
              A Sparkling Space, <br />
              Tailored Exactly For You
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm mt-4 md:mt-0 text-sm md:text-base">
            From luxury residential homes to high-capacity corporate offices, our premium services utilize carbon-neutral practices with strict attention to fine materials.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const isCommercialCard = service.id === "commercial";
            return (
              <div
                key={service.id}
                className="group relative bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:border-sky-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center">
                      {renderIcon(service.iconName)}
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-extrabold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Body details */}
                  <h3 className="font-sans font-extrabold text-xl text-slate-900 group-hover:text-sky-600 transition-colors duration-150">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-3">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="text-slate-900 font-extrabold text-sm">
                    {service.pricingInfo}
                  </div>
                  <button
                    onClick={() => setActiveModal(service)}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-500 cursor-pointer"
                  >
                    <span>Check Checklist</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Combined CTA Block inside Grid to optimize space */}
          <div className="group relative bg-teal-50 border border-teal-100 rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Top Header Row — matches other cards */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-[10px] font-extrabold bg-teal-100 text-teal-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Flexible Service
                </span>
              </div>

              <h3 className="font-sans font-extrabold text-xl text-slate-900 group-hover:text-teal-700 transition-colors duration-150">
                Need a Custom Package for Your Facility?
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">
                Multiple locations, post-renovation cleanups, or medical sanitization? We build tailored custom schedules around your exact requirements.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-teal-100 flex items-center justify-between">
              <div className="text-slate-900 font-extrabold text-sm">Let's Talk</div>
              <button
                onClick={handleBookNowJumper}
                className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-600 cursor-pointer"
              >
                <span>Get Custom Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Detailed Sheet Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            {/* Header image / banner code */}
            <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-6 relative">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-1 rounded-lg text-sky-100 hover:text-white hover:bg-white/10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 bg-white/10 rounded-lg text-white">
                  {renderIcon(activeModal.iconName)}
                </span>
                <span className="text-[10px] uppercase font-bold bg-white/20 px-2.5 py-1 rounded-full text-white">
                  Operational Checklist
                </span>
              </div>
              <h3 className="font-sans font-extrabold text-xl mt-1 text-white">
                {activeModal.title}
              </h3>
              <p className="text-sky-100 text-xs mt-1.5 leading-relaxed">Our 50-point blueprint guarantee is verified by on-site crew leaders.</p>
            </div>

            {/* Checklist items */}
            <div className="p-6 max-h-[350px] overflow-y-auto">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Included standard services:</h4>
              <ul className="space-y-3">
                {activeModal.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Modal Actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="text-slate-900 font-extrabold text-sm">
                Estimated Price: <span className="text-sky-600 font-black">{activeModal.pricingInfo}</span>
              </div>
              <button
                onClick={handleBookNowJumper}
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer shadow-md"
              >
                Estimate Instant Price
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
