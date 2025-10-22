"use client";

import { useEffect, useRef } from "react";
import { showTileHover } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks";

interface ShowTileProps {
  title: string;
  year: string;
  duration: string;
  description: string;
  category?: string;
}

export function ShowTile({
  title,
  year,
  duration,
  description,
  category,
}: ShowTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (tileRef.current && !reducedMotion) {
      showTileHover(tileRef.current);
    }
  }, [reducedMotion]);

  return (
    <div
      ref={tileRef}
      className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group"
    >
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gray-dark tile-content">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-6xl md:text-7xl font-grotesk font-bold text-white/10 mb-4">
              {title}
            </div>
          </div>
        </div>
      </div>

      {/* Orange overlay with wipe effect */}
      <div
        className="tile-overlay absolute inset-0 bg-gradient-to-br from-brand-orange/80 to-orange-600/80"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
        <div>
          {category && (
            <span className="inline-block px-3 py-1 text-xs font-inter uppercase tracking-wider bg-white/20 backdrop-blur-sm rounded-full mb-4">
              {category}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-grotesk font-bold text-2xl sm:text-3xl md:text-4xl text-white">
            {title}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-inter text-white/80">
            <span>{year}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
          <p className="text-white/90 font-inter text-xs sm:text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}


