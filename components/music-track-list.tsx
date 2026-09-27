"use client";

import type { MusicTrack } from "@/common/music";
import { setMusicQueue, toggleTrack, useMusicPlayer } from "@/lib/music-player";
import { cn } from "cn";
import Image from "next/image";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

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
  const trackButtons = useRef(new Map<string, HTMLButtonElement>());
  const [focusedTrackId, setFocusedTrackId] = useState<string | null>(null);
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

  const tabStopId =
    sortedTracks.find((track) => track.id === focusedTrackId)?.id ??
    sortedTracks.find((track) => track.id === currentTrack?.id)?.id ??
    sortedTracks[0]?.id;

  const onTracksKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      !(event.target instanceof HTMLButtonElement)
    ) {
      return;
    }

    const currentIndex = sortedTracks.findIndex(
      (track) => trackButtons.current.get(track.id) === event.target,
    );

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowDown") {
      nextIndex = Math.min(currentIndex + 1, sortedTracks.length - 1);
    } else if (event.key === "ArrowUp") {
      nextIndex = Math.max(currentIndex - 1, 0);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = sortedTracks.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    if (nextIndex === currentIndex) {
      return;
    }

    const nextButton = trackButtons.current.get(sortedTracks[nextIndex].id);

    if (!nextButton) {
      return;
    }

    nextButton.focus({ preventScroll: true });
    nextButton.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

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
      <ul
        className="-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col"
        onKeyDown={onTracksKeyDown}
      >
        {sortedTracks.map((track) => {
          const isTrackPlaying = isPlaying && currentTrack?.id === track.id;

          return (
            <li key={track.id}>
              <button
                ref={(node) => {
                  if (node) {
                    trackButtons.current.set(track.id, node);
                    return;
                  }

                  trackButtons.current.delete(track.id);
                }}
                type="button"
                tabIndex={track.id === tabStopId ? 0 : -1}
                aria-pressed={isTrackPlaying}
                onFocus={() => setFocusedTrackId(track.id)}
                onClick={() => toggleTrack(track, sortedTracks)}
                className={cn(
                  "flex w-full items-center justify-between gap-6 rounded px-1 py-0.5 text-left text-sm tracking-tight select-none",
                  isTrackPlaying
                    ? "bg-rose-600 text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-background forced-colors:focus-visible:outline-[Highlight]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
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
                  <span
                    className={cn(
                      "truncate",
                      isTrackPlaying ? "text-white" : "text-foreground",
                    )}
                  >
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
