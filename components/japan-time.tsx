"use client";

import { useState, useEffect } from "react";

export function JapanTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const jstTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
      
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      
      const formatted = jstTime.toLocaleDateString("en-US", options);
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm font-medium">
      Japan Time: {time}
    </div>
  );
}
