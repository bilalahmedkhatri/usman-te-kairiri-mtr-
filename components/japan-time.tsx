"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function JapanTime() {
  const [japanTime, setJapanTime] = useState("");

  useEffect(() => {
    function updateJapanTime() {
      const now = new Date();
      // Japan is UTC+9
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setJapanTime(new Intl.DateTimeFormat("en-US", options).format(now));
    }

    updateJapanTime();
    const interval = setInterval(updateJapanTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-950/20 rounded-full border border-red-100 dark:border-red-900/30">
      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
        JAPAN TIME:
      </span>
      <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-gray-900 dark:text-white">
        <Clock className="w-3.5 h-3.5" />
        {japanTime || "00:00:00"}
      </div>
    </div>
  );
}
