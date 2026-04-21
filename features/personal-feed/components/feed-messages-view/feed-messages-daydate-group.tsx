import { formatDate } from "date-fns";
import { useMemo } from "react";

interface FeedMessagesDayDateGroupProps {
  timestamp: Date;
  children: React.ReactNode;
}

export function FeedMessagesDayDateGroup({
  timestamp,
  children,
}: FeedMessagesDayDateGroupProps) {
  const safeTimestamp = useMemo(() => {
    return formatDate(timestamp, "MMM d, yyyy");
  }, [timestamp]);

  return (
    <div className="border-t py-5 relative w-full h-fit">
      <div className="absolute -top-4 right-1/2 translate-x-1/2 w-fit h-fit px-3 py-1 border border-border rounded-full bg-background">
        <p className="text-xs text-muted-foreground font-medium">
          {safeTimestamp}
        </p>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
