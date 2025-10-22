"use client";

import { useState, useEffect } from "react";

export function SMCClock() {
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

  const getTimeInTimezone = (timezone: string, offset: number) => {
    if (!time) return "--:--";
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (offset * 3600000));
    return localTime.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getDateInTimezone = (timezone: string, offset: number) => {
    if (!time) return "--.-- • --- • ---";
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (offset * 3600000));
    const day = localTime.getDate().toString().padStart(2, '0');
    const month = (localTime.getMonth() + 1).toString().padStart(2, '0');
    const dayName = localTime.toLocaleDateString('fr-FR', { weekday: 'short' });
    
    return `${day}.${month} • ${dayName} • ${timezone}`;
  };

  if (!isClient || !time) {
    return (
      <div className="text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="font-grotesk font-bold text-3xl sm:text-4xl">
            SMC
          </div>
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-gray-light font-inter">
            --:-- • CET
          </div>
          <div className="text-sm text-gray-light font-inter">
            --:-- • EDT
          </div>
          <div className="text-sm text-gray-light font-inter">
            --:-- • CST
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="font-grotesk font-bold text-3xl sm:text-4xl">
          SMC
        </div>
        <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm text-gray-light font-inter">
          {getTimeInTimezone('CET', 1)} • CET
        </div>
        <div className="text-sm text-gray-light font-inter">
          {getTimeInTimezone('EDT', -4)} • EDT
        </div>
        <div className="text-sm text-gray-light font-inter">
          {getTimeInTimezone('CST', -6)} • CST
        </div>
      </div>
    </div>
  );
}
