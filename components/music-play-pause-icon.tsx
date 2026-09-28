"use client";

import { cn } from "cn";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

export const MUSIC_ICON_TRANSITION = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0,
};

export const MUSIC_ICON_SWAP = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
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
