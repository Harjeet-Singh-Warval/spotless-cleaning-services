import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact image URLs generated previously
  const beforeImg = "/src/assets/images/kitchen_before_1782033317214.jpg";
  const afterImg = "/src/assets/images/kitchen_clean_after_1782033333399.jpg";

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="transformation-gallery" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Our Standards Speak
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 mt-3">
            Real Transformations, Pristine Results
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Slide left and right to see the magic of Spotless Cleaning Services. We remove greasy grime, organize cluttered countertops, and make spaces feel like brand-new.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="relative bg-white p-4 rounded-3xl shadow-xl border border-slate-100">
          <div
            id="slider-stage"
            ref={containerRef}
            className="relative h-[250px] sm:h-[400px] md:h-[480px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* "After" Image (Underlay / Base) */}
            <img
              src={afterImg}
              alt="Sparkling Clean Kitchen Counter after Spotless Cleaning Services"
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute right-4 bottom-4 bg-emerald-600/95 backdrop-blur-xs text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md z-10 flex items-center gap-1.5 pointer-events-none uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              After Spotless
            </div>

            {/* "Before" Image (Overlay clipping based on slider percentage) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeImg}
                alt="Messy kitchen counter before cleaning"
                className="absolute inset-0 h-full w-full object-cover max-w-none"
                style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute left-4 bottom-4 bg-slate-900/85 backdrop-blur-xs text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md z-10 pointer-events-none uppercase tracking-wide">
                Dirty Before
              </div>
            </div>

            {/* Swipe handle slider line */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl z-20 pointer-events-none cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag badge circle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-sky-600 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-colors duration-150 cursor-ew-resize">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Tips & Trust below Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              The 50-Point Sanitization Process
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Every room undergoes our rigid 50-point cleaning checklist covering baseboards, high corners, window trims, cabinet fronts, and deep surface steam cleans.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Safe, Multi-Surface Protection
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              We employ tailored solutions for distinct materials—quartz countertops get polished neutral sealers, marble stays acid-free, and real oak gets conditioned with natural oils.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
