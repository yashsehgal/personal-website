"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

interface FeedsSidebarGroupProps {
  children: React.ReactNode;
  label: string;
}

export function FeedsSidebarGroup({ children, label }: FeedsSidebarGroupProps) {
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  const handleGroupToggle = useCallback(() => {
    setIsGroupOpen((prev) => !prev);
  }, []);

  return (
    <section className={cn("")}>
      <Button
        className={cn("justify-start text-muted-foreground px-2 w-fit")}
        withoutMicroInteractions
        variant="ghost"
        size="xs"
        onClick={handleGroupToggle}
      >
        <p className="text-xs leading-0">{label}</p>
        <ChevronRight
          className={cn(
            "size-3.5 transition-transform",
            isGroupOpen && "rotate-90",
          )}
        />
      </Button>
      <div
        className={cn("px-1 hidden mt-1 space-y-0.5", isGroupOpen && "block")}
      >
        {children}
      </div>
    </section>
  );
}
