"use client";

import { useMusicPlayer } from "@/lib/music-player";
import { cn } from "cn";
import { Music, Music2, Music4 } from "lucide-react";
import type { CSSProperties } from "react";

const FLOATING_NOTES = [
  { icon: Music2, x: "-11px", y: "-9px", rotate: "-20deg", delay: "0s" },
  { icon: Music4, x: "-1px", y: "-14px", rotate: "12deg", delay: "0.8s" },
  { icon: Music2, x: "6px", y: "-13px", rotate: "24deg", delay: "1.6s" },
  { icon: Music4, x: "-13px", y: "3px", rotate: "-12deg", delay: "2.4s" },
] as const;

export function MusicNavigationIcon({ className }: { className?: string }) {
  const { isPlaying } = useMusicPlayer();

  return (
    <span aria-hidden="true" className={cn("relative", className)}>
      <Music
        className={cn(
          "size-full origin-[50%_80%]",
          isPlaying && "animate-music-icon-sway motion-reduce:animate-none",
        )}
      />
      {isPlaying
        ? FLOATING_NOTES.map((note) => (
            <note.icon
              key={note.delay}
              strokeWidth={2.5}
              className="pointer-events-none absolute top-[3px] left-[3px] size-2 animate-music-note-float motion-reduce:hidden"
              style={
                {
                  "--note-x": note.x,
                  "--note-y": note.y,
                  "--note-rotate": note.rotate,
                  animationDelay: note.delay,
                } as CSSProperties
              }
            />
          ))
        : null}
    </span>
  );
}
