import React from "react";
import { CalendarDays, Sparkles, Coffee, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: "01",
      title: "Book Online Instantly",
      description: "Pick your service type, customize rooms & square footage using our quote tool, and select a preferred date in less than 60 seconds.",
      icon: <CalendarDays className="w-8 h-8 text-sky-600" />,
      color: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      stepNumber: "02",
      title: "Our Crew Cleans",
      description: "An insured, vetted, background-checked professional arrives on time with premium non-toxic supplies to deep-scrub and sanitize.",
      icon: <Sparkles className="w-8 h-8 text-emerald-600" />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      stepNumber: "03",
      title: "You Relax & Enjoy",
      description: "Return home to crisp, sparkling interiors and breathing comfort. Relish your newly found free time knowing it is backed by our full re-clean warranty.",
      icon: <Coffee className="w-8 h-8 text-amber-500" />,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

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

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-slate-900 mt-4 leading-tight">
            Seamless Freshness, From Screen to Sanctuary
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            Getting your facility or home clean has never been easier. We’ve streamlined our logistics so there are absolute zero hassles.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (for desktop) */}
          <div className="hidden lg:block absolute top-[90px] left-[15%] right-[15%] h-0.5 bg-dashed bg-slate-200 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-105 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                id={`how-works-step-${idx}`}
              >
                {/* Float Step Number */}
                <div className="absolute top-6 right-8 text-4xl font-sans font-black text-slate-100 group-hover:text-sky-50/50 transition-colors pointer-events-none">
                  {step.stepNumber}
                </div>

                <div>
                  {/* Icon circle */}
                  <div className={`w-16 h-16 rounded-2xl ${step.color} border flex items-center justify-center mb-6`}>
                    {step.icon}
                  </div>

                  <h3 className="font-sans font-black text-xl text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {idx !== 2 && (
                  <div className="hidden lg:flex justify-end pr-4 text-slate-300 group-hover:text-sky-500 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action jump */}
        <div className="mt-16 text-center">
          <button
            onClick={handleScrollToQuote}
            className="inline-flex items-center gap-2 text-sm font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-2xl p-4 px-8 shadow-xl shadow-sky-100 transition-all cursor-pointer hover:scale-[1.01]"
          >
            <span>Book Your Clean Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
