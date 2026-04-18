"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronsUpDown, Plus, Search, SquarePen } from "lucide-react";

export function FeedMobileNavigation() {
  return (
    <div className="fixed bottom-0 py-4 px-3.5 w-full left-0 flex items-center justify-between gap-2">
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
          "flex-1 bg-primary/3 rounded-full border border-border h-12 flex items-center justify-between px-4 select-none cursor-default",
          "drop-shadow-2xl backdrop-blur-sm drop-shadow-white",
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
              "size-12 active:not-aria-[haspopup]:scale-none active:not-aria-[haspopup]:translate-y-0 bg-primary/3",
              "drop-shadow-2xl backdrop-blur-sm drop-shadow-white",
            )}
          >
            <SquarePen />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
