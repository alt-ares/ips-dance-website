"use client";

import { useState, useEffect } from "react";

export function TimeZones() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (offset: number, timezone: string) => {
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (offset * 3600000));
    return localTime.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="space-y-1">
      <div className="text-sm text-white font-inter">
        {getTimeInTimezone(1, 'CET')} • CET
      </div>
      <div className="text-sm text-white font-inter">
        {getTimeInTimezone(-4, 'EDT')} • EDT
      </div>
      <div className="text-sm text-white font-inter">
        {getTimeInTimezone(-6, 'CST')} • CST
      </div>
    </div>
  );
}
