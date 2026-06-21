import React from "react";
import { Sparkles, HeartIcon, Target, Users2, ShieldCheck, Flame } from "lucide-react";

export default function AboutUs() {
  const teamImg = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"; // Professional housekeeping specialists cleaning a home tidy and cheerful

  return (
    <section id="about-story" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story Content - 7 columns */}
          <div className="lg:col-span-7">
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Our Story & Mission
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-slate-900 mt-4 leading-tight">
              Crafting Healthy, Stress-Free Spaces Since 2018
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-6">
              Spotless Cleaning Services was founded on a simple truth: <strong>a clean home is a peaceful mind</strong>, but finding the time to maintain it shouldn't be another source of stress. We set out to change the housekeeping industry by treating cleaning as a craft rather than a chore.
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-4">
              Starting as a passionate husband-and-wife duo with a single vacuum cleaner, we’ve expanded into a highly trained, certified squad of over 35 professional cleaners. Despite our growth, our foundational values remain unchanged: absolute honesty, attention to fine materials (like quartz and hardwoods), carbon-neutral transport fleets, and uncompromising customer care.
            </p>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <HeartIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-base">Unmatched Care</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    We listen to your specific requests and focus on high-touch surfaces, baseboards, and critical pet zones.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-base">Pet-Safe & Non-Toxic</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    We protect your kids, pets, and our cleaners by strictly using premium EPA certified eco-solvent formulas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Users2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-base">Continuous Training</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Our team undergoes routine material coaching to specialize in granite, micro-fibers, and safe grout restoring.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-base">Bonded & Insured Integrity</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Every visit includes full $2M liability general insurance safeguards for complete structural confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo & Mission Card overlay - 5 columns */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Background decoration bubble */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-emerald-450 rounded-full bg-emerald-100 z-0 animate-bounce [animation-duration:10s]"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sky-100 rounded-full z-0 animate-pulse"></div>

            <div className="relative bg-white border border-slate-105 rounded-3xl overflow-hidden shadow-2xl z-10 p-4">
              <img
                src={teamImg}
                alt="Vetted Spotless Cleaning Services professional cleaning crew smiling and tidying up a spacious home"
                className="w-full h-64 md:h-80 object-cover rounded-2xl pointer-events-none"
                referrerPolicy="no-referrer"
              />

              <div className="p-4 pt-6 bg-slate-900 text-white rounded-2xl mt-4">
                <p className="italic text-xs md:text-sm text-slate-300 leading-relaxed">
                  "Our mission is simple: to make your living and working environments safe, spotless, and incredibly nourishing so you can invest your energy where it matters most to you."
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-sky-400">
                    Marc & Sarah Miller, Founders
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
