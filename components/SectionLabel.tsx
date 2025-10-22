"use client";

interface SectionLabelProps {
  number: string;
  title: string;
}

export function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
      <span className="text-brand-orange font-grotesk font-bold text-base sm:text-lg">
        {number}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-brand-orange/50 to-transparent" />
      <span className="text-gray-light font-inter text-xs sm:text-sm uppercase tracking-widest">
        {title}
      </span>
    </div>
  );
}


