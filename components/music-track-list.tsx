"use client";

import type { MusicTrack } from "@/common/music";
import { setMusicQueue, toggleTrack, useMusicPlayer } from "@/lib/music-player";
import { cn } from "cn";
import Image from "next/image";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useId, useMemo } from "react";

const SORT_OPTIONS = [
  { value: "title", label: "Track Title" },
  { value: "artist", label: "Artist" },
] as const;

const SORT_KEYS = {
  title: ["title", "artist"],
  artist: ["artist", "title"],
} as const;

type MusicTrackListProps = {
  tracks: MusicTrack[];
};

export function MusicTrackList({ tracks }: MusicTrackListProps) {
  const { currentTrack, isPlaying } = useMusicPlayer();
  const sortLabelId = useId();
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringLiteral(SORT_OPTIONS.map((option) => option.value)).withDefault(
      "title",
    ),
  );

  const sortedTracks = useMemo(
    () =>
      [...tracks].sort((a, b) => {
        for (const key of SORT_KEYS[sortBy]) {
          const order = a[key].localeCompare(b[key], "en", {
            sensitivity: "base",
          });

          if (order !== 0) {
            return order;
          }
        }

        return 0;
      }),
    [tracks, sortBy],
  );

  useEffect(() => setMusicQueue(sortedTracks), [sortedTracks]);

  return (
    <>
      <div className="flex w-full items-baseline justify-between gap-6">
        <h1 className="font-medium tracking-tight">Music</h1>
        <div
          role="group"
          aria-labelledby={sortLabelId}
          className="-mr-1 flex items-baseline gap-1 text-sm tracking-tight"
        >
          <span id={sortLabelId} className="mr-1 text-muted-foreground">
            Sort by
          </span>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={sortBy === option.value}
              onClick={() => void setSortBy(option.value)}
              className={cn(
                "rounded px-1 py-0.5 select-none",
                sortBy === option.value
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col">
        {sortedTracks.map((track) => {
          const isTrackPlaying = isPlaying && currentTrack?.id === track.id;

          return (
            <li key={track.id}>
              <button
                type="button"
                aria-pressed={isTrackPlaying}
                onClick={() => toggleTrack(track, sortedTracks)}
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
                  <span className="truncate text-foreground">
                    {track.title}
                  </span>
                </span>
                <span className="shrink-0">{track.artist}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
