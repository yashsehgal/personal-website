"use client";

import type { MusicTrack } from "@/common/music";
import { toggleTrack, useMusicPlayer } from "@/lib/music-player";
import { cn } from "cn";
import Image from "next/image";

type MusicTrackListProps = {
  tracks: MusicTrack[];
};

export function MusicTrackList({ tracks }: MusicTrackListProps) {
  const { currentTrackId, isPlaying } = useMusicPlayer();

  return (
    <ul className="-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col">
      {tracks.map((track) => {
        const isTrackPlaying = isPlaying && currentTrackId === track.id;

        return (
          <li key={track.id}>
            <button
              type="button"
              aria-pressed={isTrackPlaying}
              onClick={() => toggleTrack(track, tracks)}
              className={cn(
                "flex w-full items-center justify-between gap-6 rounded px-1 py-0.5 text-left text-sm tracking-tight select-none hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
                isTrackPlaying
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Image
                  src={track.artworkUrl}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  draggable={false}
                  className="size-5 shrink-0 rounded-xs bg-muted outline outline-foreground/10 -outline-offset-1"
                />
                <span className="truncate text-foreground">{track.title}</span>
              </span>
              <span className="shrink-0">{track.artist}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
