"use client";

import { useEffect, useState } from "react";

const INDIA_TIMEZONE = "Asia/Kolkata";

function formatBombayTime(date: Date) {
  return date
    .toLocaleString("en-IN", {
      timeZone: INDIA_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\s/g, "");
}

function HoppingBunny() {
  return (
    <span
      aria-hidden="true"
      className="ml-1.5 inline-flex select-none flex-col items-center justify-center leading-[0.85] mb-1.5"
    >
      <span className="inline-flex origin-bottom flex-col items-center group-hover:animate-bunny-hop motion-reduce:group-hover:animate-none">
        <span className="origin-bottom text-[0.7em] font-semibold tracking-[0.16em] group-hover:animate-bunny-ears motion-reduce:group-hover:animate-none">
          {"//"}
        </span>
        <span className="text-[0.78em] font-semibold tracking-wide">(• •)</span>
      </span>
    </span>
  );
}

export function HomeScreenFooterSection() {
  const [formattedSanitizedDate, setFormattedSanitizedDate] = useState(() =>
    formatBombayTime(new Date()),
  );

  useEffect(() => {
    const updateTime = () => {
      setFormattedSanitizedDate(formatBombayTime(new Date()));
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <footer className="px-3 cursor-default select-none">
      <p className="group inline-flex items-center text-base text-primary/40 font-medium">
        <span className="tabular-nums mr-1" suppressHydrationWarning>
          {formattedSanitizedDate}
        </span>{" "}
        in Bombay, India
        <HoppingBunny />
      </p>
    </footer>
  );
}
