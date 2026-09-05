import { useMemo } from "react";

const INDIA_TIMEZONE: string = "IST" as const;

export function HomeScreenFooterSection() {
  const currentDate = useMemo(() => new Date(), []);
  const sanitizedDate = useMemo(() => {
    return currentDate.toLocaleString("en-IN", {
      timeZone: INDIA_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [currentDate]);

  const formattedSanitizedDate = useMemo(() => {
    return sanitizedDate.replace(/\s/g, "");
  }, [sanitizedDate]);

  return (
    <footer className="px-3">
      <p className="text-base text-primary/40 font-medium">
        {formattedSanitizedDate} in Bombay, India
      </p>
    </footer>
  );
}
