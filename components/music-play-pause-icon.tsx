"use client";

import { cn } from "cn";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

export const MUSIC_ICON_TRANSITION = {
  duration: 0.16,
  ease: [0.23, 1, 0.32, 1] as const,
};

export const MUSIC_ICON_SWAP = {
  initial: { opacity: 0, transform: "scale(0.95)" },
  animate: { opacity: 1, transform: "scale(1)" },
  exit: { opacity: 0, transform: "scale(0.95)" },
  transition: MUSIC_ICON_TRANSITION,
};

export function MusicPlayPauseIcon({
  isPlaying,
  iconClassName,
}: {
  isPlaying: boolean;
  iconClassName?: string;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={isPlaying ? "pause" : "play"}
        className="flex items-center justify-center"
        {...MUSIC_ICON_SWAP}
      >
        {isPlaying ? (
          <Pause
            aria-hidden="true"
            className={cn("fill-current", iconClassName)}
          />
        ) : (
          <Play
            aria-hidden="true"
            className={cn("translate-x-px fill-current", iconClassName)}
          />
        )}
      </motion.span>
    </AnimatePresence>
  );
}
