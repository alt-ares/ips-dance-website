"use client";

interface LiquidCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function LiquidCard({ title, description, icon }: LiquidCardProps) {
  return (
    <div className="liquid-glass rounded-2xl p-6 sm:p-8 md:p-10">
      <div className="space-y-4">
        {icon && (
          <div className="mb-6">{icon}</div>
        )}
        <h3 className="font-grotesk font-bold text-xl sm:text-2xl md:text-3xl text-white">
          {title}
        </h3>
        <p className="text-gray-light font-inter text-sm sm:text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}


