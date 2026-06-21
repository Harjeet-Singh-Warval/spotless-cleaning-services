import React from "react";
import { ShieldCheck, Leaf, Award, UserCheck, Star, Users, Flame } from "lucide-react";
import { TrustBadgeItem } from "../types";

export default function WhyChooseUs() {
  const badges: TrustBadgeItem[] = [
    {
      id: "insured",
      title: "Fully Insured & Bonded",
      description: "Our comprehensive $2,000,000 liability policy covers every crew member and valuable in your property, guaranteeing absolute protection during our visits.",
      iconName: "ShieldCheck",
    },
    {
      id: "eco",
      title: "100% Eco-Friendly Products",
      description: "We exclusively employ organic, non-toxic, and EPA-certified biodegradable solvents. Clean spaces that are perfectly safe for inquisitive pets and infants.",
      iconName: "Leaf",
    },
    {
      id: "satisfaction",
      title: "Satisfaction Guarantee",
      description: "Our policy is absolute: if any corner fails to meet your rigorous expectations, contact us within 24 hours. We will dispatch a squad to re-clean for free.",
      iconName: "Award",
    },
    {
      id: "background",
      title: "Background-Checked Crew",
      description: "Every household specialist undergoes third-party background screenings, fingerprint checks, in-person training cycles, and direct character vetoing.",
      iconName: "UserCheck",
    },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 text-sky-600" />;
      case "Leaf":
        return <Leaf className="w-8 h-8 text-emerald-600" />;
      case "Award":
        return <Award className="w-8 h-8 text-amber-500" />;
      case "UserCheck":
        return <UserCheck className="w-8 h-8 text-sky-600" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-sky-600" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Uncompromised Quality
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-slate-900 mt-4 leading-tight">
            Setting the Golden Standard for Pure Spaces
          </h2>
          <p className="text-slate-500 mt-4 text-base md:text-lg">
            We aren't just cleaning rooms; we are restoring leisure, health, and peace of mind. Here is why thousands of residential and commercial facilities trust Spotless.
          </p>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-start gap-6 group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {renderIcon(badge.iconName)}
              </div>
              <div>
                <h3 className="font-sans font-black text-lg text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {badge.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Statistics Bar */}
        <div className="mt-16 bg-sky-650 rounded-3xl py-10 px-8 text-white grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center shadow-lg relative overflow-hidden bg-sky-600">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500 rounded-full opacity-20 filter blur-3xl"></div>

          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-extrabold text-white">
              7,500+
            </span>
            <span className="block text-sky-200 text-xs uppercase tracking-wider font-bold mt-1">
              Completed Cleans
            </span>
          </div>

          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-extrabold text-white animate-pulse">
              100%
            </span>
            <span className="block text-sky-200 text-xs uppercase tracking-wider font-bold mt-1">
              Safe & Non-Toxic
            </span>
          </div>

          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-extrabold text-white">
              35+
            </span>
            <span className="block text-sky-200 text-xs uppercase tracking-wider font-bold mt-1">
              Vetted Experts
            </span>
          </div>

          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-extrabold text-white">
              4.9
            </span>
            <span className="block text-sky-200 text-xs uppercase tracking-wider font-bold mt-1 flex items-center justify-center gap-1">
              Average Stars
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
