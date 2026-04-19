"use client";

import { Button } from "@/components/ui/button";
import { FeedMobileSearchManager } from "@/features/personal-feed/components/feed-mobile-search-manager";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronsUpDown, Search, SquarePen } from "lucide-react";

export function FeedMobileNavigation() {
  return (
    <div className="fixed bottom-0 py-4 px-3.5 w-full left-0 flex items-center justify-between gap-2 bg-linear-to-b from-white/10 to-white">
      <FeedMobileSearchManager>
        <motion.div
          whileTap={{
            scale: 0.97,
            y: -1,
          }}
          transition={{
            type: "spring",
            bounce: 0.5,
            duration: 0.5,
          }}
          className={cn(
            "flex-1 bg-white/70 rounded-full border border-border h-12 flex items-center justify-between px-4 select-none cursor-default",
            "backdrop-blur-xs",
          )}
        >
          <div className="flex items-center justify-start gap-2 text-muted-foreground">
            <Search className="size-4 shrink-0 mb-px" />
            <p className="text-sm">Search</p>
          </div>
          <ChevronsUpDown
            className="size-4 shrink-0 mb-px text-foreground/40"
            strokeWidth={2.2}
          />
        </motion.div>
      </FeedMobileSearchManager>
      <div className="w-12 shrink-0">
        <motion.div
          whileTap={{
            scale: 0.97,
            y: -1,
          }}
          transition={{
            type: "spring",
            bounce: 0.6,
            duration: 0.5,
          }}
        >
          <Button
            variant="outline"
            size="icon-lg"
            className={cn(
              "size-12 active:not-aria-[haspopup]:scale-none active:not-aria-[haspopup]:translate-y-0 bg-white/70",
              "backdrop-blur-xs",
            )}
          >
            <SquarePen />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
