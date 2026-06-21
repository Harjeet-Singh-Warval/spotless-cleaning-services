import React, { useState } from "react";
import { Locate, ShieldCheck, Clock, MapPin } from "lucide-react";

interface AreaZone {
  id: string;
  name: string;
  availability: string;
  dispatchTime: string;
  coordinates: string; // Dynamic path for SVG representation
  stats: string;
}

export default function MapArea() {
  const [selectedZone, setSelectedZone] = useState<string>("center");

  const zones: AreaZone[] = [
    {
      id: "center",
      name: "Downtown & Center Core",
      availability: "Monday – Sunday (Full Access)",
      dispatchTime: "Under 4 hours, same-day premium support available",
      stats: "Over 450 recurring clients serviced",
      coordinates: "M 100,50 L 250,50 L 280,180 L 120,200 Z",
    },
    {
      id: "north",
      name: "Northside Residential Suburbs",
      availability: "Monday – Saturday",
      dispatchTime: "Same-day or scheduled within 24 hours",
      stats: "Mainly residential recurring cleanings",
      coordinates: "M 50,10 L 250,10 L 250,50 L 100,50 Z",
    },
    {
      id: "west",
      name: "Westwood Peaks & Gated Hills",
      availability: "Monday, Wednesday, Friday",
      dispatchTime: "Within 24 hours of booking",
      stats: "Luxury estates & customized deep-cleaning",
      coordinates: "M 10,60 L 100,50 L 120,200 L 10,180 Z",
    },
    {
      id: "east",
      name: "East Coast Bay & Business Bay",
      availability: "Monday – Friday (Corporate Friendly)",
      dispatchTime: "Flexible after-hours scheduled cleaning",
      stats: "Corporate offices, retail stores & clinics",
      coordinates: "M 250,50 L 390,80 L 390,220 L 280,180 Z",
    },
    {
      id: "south",
      name: "Oakridge Valley & South District",
      availability: "Tuesday, Thursday, Saturday",
      dispatchTime: "Scheduled 24-48 hours ahead",
      stats: "Move-in / Move-out priority response sector",
      coordinates: "M 120,200 L 280,180 L 320,320 L 80,300 Z",
    },
  ];

  const currentZone = zones.find((z) => z.id === selectedZone) || zones[0];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
            <Locate className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-slate-900 text-lg">Interactive Service Coverage Area</h3>
            <p className="text-xs text-slate-500">Serving metro communities with carbon-neutral transit</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6">
          Hover or click on the zone sectors of our operational map to view local squad availability, dispatch times, and service schedule commitments.
        </p>

        {/* Dynamic SVG Map Grid representation */}
        <div className="relative bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center overflow-hidden mb-6 h-64 md:h-72">
          {/* Subtle background compass/coordinates grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

          {/* Map Vector Graphic */}
          <svg
            viewBox="0 0 400 350"
            className="w-full h-full max-w-sm drop-shadow-md relative z-10"
            aria-label="Service coverage map visualization"
          >
            {zones.map((zone) => {
              const isSelected = selectedZone === zone.id;
              return (
                <path
                  key={zone.id}
                  d={zone.coordinates}
                  className={`transition-all duration-300 cursor-pointer stroke-2 stroke-white ${
                    isSelected
                      ? "fill-sky-500 opacity-90 filter drop-shadow-lg"
                      : "fill-sky-100 hover:fill-sky-200 opacity-80"
                  }`}
                  onClick={() => setSelectedZone(zone.id)}
                />
              );
            })}

            {/* Labels placed over regions */}
            <text x="170" y="110" className="text-[10px] font-sans font-bold fill-slate-700 pointer-events-none text-center">Core Metro</text>
            <text x="145" y="32" className="text-[9px] font-sans font-medium fill-slate-500 pointer-events-none">Northside</text>
            <text x="35" y="130" className="text-[9px] font-sans font-medium fill-slate-500 pointer-events-none">West Hills</text>
            <text x="305" y="130" className="text-[9px] font-sans font-medium fill-slate-500 pointer-events-none">East Bay</text>
            <text x="180" y="250" className="text-[9px] font-sans font-medium fill-slate-500 pointer-events-none">Oakridge Valley</text>
          </svg>

          {/* Quick status sticker */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-sky-700 border border-slate-200 shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            Staff Dispatch Active
          </div>
        </div>
      </div>

      {/* Interactive Detail Box */}
      <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/50">
        <h4 className="font-sans font-bold text-sky-950 text-sm md:text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
          {currentZone.name}
        </h4>

        <div className="mt-3 space-y-2 text-xs md:text-sm text-slate-700">
          <div className="flex items-start gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
            <span>
              <strong className="text-slate-900">Availability:</strong> {currentZone.availability}
            </span>
          </div>
          <div className="flex items-start gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
            <span>
              <strong className="text-slate-900">Dispatch Speed:</strong> {currentZone.dispatchTime}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-sky-100/80 flex items-center justify-between text-[11px] text-sky-800 font-medium">
          <span>{currentZone.stats}</span>
          <span className="bg-white px-2 py-0.5 rounded-full text-slate-500 text-[10px]">
            Zone {currentZone.id.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
