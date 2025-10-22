"use client";

import { useState, useEffect } from "react";

export function RealTimeClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTime(new Date());
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
    
    // Fuseau horaire français
    const timezone = 'CET';
    
    return `${day}.${month} • ${dayName} • ${timezone}`;
  };

  if (!isClient || !time) {
    return (
      <div className="text-white font-grotesk">
        <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-1">
          --:--
        </div>
        <div className="text-xs sm:text-sm text-white font-inter">
          --.-- • --- • ---
        </div>
      </div>
    );
  }

  return (
    <div className="text-white font-grotesk">
      <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-1">
        {formatTime(time)}
      </div>
      <div className="text-xs sm:text-sm text-white font-inter">
        {formatDate(time)}
      </div>
    </div>
  );
}
