"use client";

import type { MusicTrack } from "@/common/music";
import {
  MUSIC_ICON_SWAP,
  MusicPlayPauseIcon,
} from "@/components/music-play-pause-icon";
import { getArtworkPalette } from "@/lib/artwork-palette";
import { setMusicQueue, toggleTrack, useMusicPlayer } from "@/lib/music-player";
import { cn } from "cn";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

const SORT_OPTIONS = [
  { value: "title", label: "Track Title" },
  { value: "artist", label: "Artist" },
] as const;

const VIEW_OPTIONS = [
  { value: "list", label: "List" },
  { value: "tiles", label: "Tiles" },
] as const;

const SORT_KEYS = {
  title: ["title", "artist"],
  artist: ["artist", "title"],
} as const;

const MARQUEE_SPEED_PX_PER_SECOND = 32;
const MARQUEE_TRAVEL_PORTION = 0.64;
const MARQUEE_MIN_DURATION_SECONDS = 2.8;

type MusicView = (typeof VIEW_OPTIONS)[number]["value"];
type SortKey = (typeof SORT_OPTIONS)[number]["value"];

type MusicTrackListProps = {
  tracks: MusicTrack[];
};

function marqueeDuration(shift: number) {
  return Math.max(
    MARQUEE_MIN_DURATION_SECONDS,
    shift / MARQUEE_SPEED_PX_PER_SECOND / MARQUEE_TRAVEL_PORTION,
  );
}

function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const labelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="flex items-baseline gap-1"
    >
      <span id={labelId} className="mr-1 text-muted-foreground">
        {label}
      </span>
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded px-1 py-0.5 select-none",
              isSelected
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function TrackTitle({
  text,
  active,
  className,
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const label = textRef.current;

    if (!container || !label) {
      return;
    }

    const measure = () => {
      const next = Math.max(
        0,
        Math.ceil(label.scrollWidth - container.clientWidth),
      );

      setShift((current) => (Math.abs(next - current) <= 1 ? current : next));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);

    return () => observer.disconnect();
  }, [text]);

  const scrolling = active && shift > 2;

  return (
    <span
      ref={containerRef}
      className={cn("relative block min-w-0 overflow-hidden", className)}
    >
      <span className={cn("block truncate", scrolling && "opacity-0")}>
        {text}
      </span>
      <span
        ref={textRef}
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 w-max whitespace-nowrap",
          scrolling ? "track-title-marquee" : "invisible",
        )}
        style={
          scrolling
            ? ({
                "--marquee-shift": `-${shift}px`,
                "--marquee-duration": `${marqueeDuration(shift).toFixed(2)}s`,
              } as CSSProperties)
            : undefined
        }
      >
        {text}
      </span>
    </span>
  );
}

function usePlayingPalette(artworkUrl: string | undefined) {
  const [palette, setPalette] = useState<{
    url: string;
    colors: string[];
  } | null>(null);

  useEffect(() => {
    if (!artworkUrl) {
      return;
    }

    let isCancelled = false;

    getArtworkPalette(artworkUrl)
      .then((colors) => {
        if (!isCancelled && colors.length > 0) {
          setPalette({ url: artworkUrl, colors });
        }
      })
      .catch(() => {});

    return () => {
      isCancelled = true;
    };
  }, [artworkUrl]);

  if (!artworkUrl || palette?.url !== artworkUrl) {
    return null;
  }

  return palette.colors;
}

function findTileInDirection(
  current: HTMLButtonElement,
  key: "ArrowDown" | "ArrowUp" | "ArrowLeft" | "ArrowRight",
  buttons: HTMLButtonElement[],
) {
  const origin = current.getBoundingClientRect();
  const originX = origin.left + origin.width / 2;
  const originY = origin.top + origin.height / 2;
  let match: HTMLButtonElement | null = null;
  let best = Number.POSITIVE_INFINITY;

  for (const button of buttons) {
    if (button === current) {
      continue;
    }

    const rect = button.getBoundingClientRect();
    const dx = rect.left + rect.width / 2 - originX;
    const dy = rect.top + rect.height / 2 - originY;
    const aligned =
      key === "ArrowRight"
        ? dx > origin.width * 0.4 && Math.abs(dy) <= origin.height * 0.65
        : key === "ArrowLeft"
          ? dx < -origin.width * 0.4 && Math.abs(dy) <= origin.height * 0.65
          : key === "ArrowDown"
            ? dy > origin.height * 0.35 && Math.abs(dx) <= origin.width * 0.65
            : dy < -origin.height * 0.35 && Math.abs(dx) <= origin.width * 0.65;

    if (!aligned) {
      continue;
    }

    const primary =
      key === "ArrowLeft" || key === "ArrowRight" ? Math.abs(dx) : Math.abs(dy);
    const secondary =
      key === "ArrowLeft" || key === "ArrowRight" ? Math.abs(dy) : Math.abs(dx);
    const score = primary + secondary * 4;

    if (score < best) {
      best = score;
      match = button;
    }
  }

  return match;
}

export function MusicTrackList({ tracks }: MusicTrackListProps) {
  const { currentTrack, isPlaying } = useMusicPlayer();
  const trackButtons = useRef(new Map<string, HTMLButtonElement>());
  const [focusedTrackId, setFocusedTrackId] = useState<string | null>(null);
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringLiteral(SORT_OPTIONS.map((option) => option.value)).withDefault(
      "title",
    ),
  );
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(VIEW_OPTIONS.map((option) => option.value)).withDefault(
      "list",
    ),
  );
  const palette = usePlayingPalette(currentTrack?.artworkUrl);
  const playingColor = isPlaying ? palette?.[0] : null;

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

  const focusTrack = (trackId: string | undefined) => {
    const nextButton = trackId ? trackButtons.current.get(trackId) : undefined;

    if (!nextButton) {
      return;
    }

    nextButton.focus({ preventScroll: true });
    nextButton.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

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

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      focusTrack(
        sortedTracks[event.key === "Home" ? 0 : sortedTracks.length - 1]?.id,
      );
      return;
    }

    if (view === "tiles") {
      if (
        event.key !== "ArrowDown" &&
        event.key !== "ArrowUp" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight"
      ) {
        return;
      }

      event.preventDefault();

      const buttons = sortedTracks.flatMap((track) => {
        const button = trackButtons.current.get(track.id);
        return button ? [button] : [];
      });
      const next = findTileInDirection(event.target, event.key, buttons);

      if (!next) {
        return;
      }

      next.focus({ preventScroll: true });
      next.scrollIntoView({ block: "nearest", inline: "nearest" });
      return;
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowDown") {
      nextIndex = Math.min(currentIndex + 1, sortedTracks.length - 1);
    } else if (event.key === "ArrowUp") {
      nextIndex = Math.max(currentIndex - 1, 0);
    } else {
      return;
    }

    event.preventDefault();
    focusTrack(sortedTracks[nextIndex]?.id);
  };

  const setTrackButton = (trackId: string, node: HTMLButtonElement | null) => {
    if (node) {
      trackButtons.current.set(trackId, node);
      return;
    }

    trackButtons.current.delete(trackId);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h1 className="font-medium tracking-tight">Music</h1>
        <div className="-mr-1 flex flex-wrap items-baseline justify-end gap-x-5 text-sm tracking-tight">
          <OptionGroup<MusicView>
            label="View"
            value={view}
            options={VIEW_OPTIONS}
            onChange={(next) => void setView(next)}
          />
          <OptionGroup<SortKey>
            label="Sort by"
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={(next) => void setSortBy(next)}
          />
        </div>
      </div>
      {view === "tiles" ? (
        <ul
          className="grid w-full min-w-0 grid-cols-[repeat(auto-fill,minmax(10.75rem,1fr))] gap-x-5 gap-y-6"
          onKeyDown={onTracksKeyDown}
        >
          {sortedTracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            const isTrackPlaying = isPlaying && isCurrent;
            const isActive =
              hoveredTrackId === track.id || focusedTrackId === track.id;
            const showPlayControl = isActive || isCurrent;

            return (
              <li key={track.id} className="min-w-0">
                <button
                  ref={(node) => setTrackButton(track.id, node)}
                  type="button"
                  tabIndex={track.id === tabStopId ? 0 : -1}
                  aria-pressed={isTrackPlaying}
                  aria-label={`${isTrackPlaying ? "Pause" : "Play"} ${track.title} by ${track.artist}`}
                  onFocus={() => setFocusedTrackId(track.id)}
                  onMouseEnter={() => setHoveredTrackId(track.id)}
                  onMouseLeave={() =>
                    setHoveredTrackId((hoveredId) =>
                      hoveredId === track.id ? null : hoveredId,
                    )
                  }
                  onClick={() => toggleTrack(track, sortedTracks)}
                  className={cn(
                    "group flex w-full min-w-0 flex-col gap-1.5 rounded-[1rem] p-1.5 text-left select-none transition-[background-color,opacity] duration-150 ease-out focus-visible:outline-none forced-colors:focus-visible:outline-2 forced-colors:focus-visible:-outline-offset-2 forced-colors:focus-visible:outline-[Highlight]",
                    isTrackPlaying && playingColor
                      ? "track-tile-live [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90 focus-visible:opacity-90"
                      : "hover:bg-muted focus-visible:bg-muted",
                  )}
                  style={
                    isTrackPlaying && playingColor
                      ? ({
                          "--track-highlight": `rgb(${playingColor})`,
                        } as CSSProperties)
                      : undefined
                  }
                >
                  <span className="relative block aspect-square overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={track.largeArtworkUrl}
                      alt=""
                      width={512}
                      height={512}
                      unoptimized
                      draggable={false}
                      className="size-full object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-150 ease-out",
                        showPlayControl ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className="track-artwork-frame pointer-events-none absolute inset-0 rounded-[inherit]"
                    />
                    <AnimatePresence initial={false}>
                      {showPlayControl ? (
                        <motion.span
                          key="play-control"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 grid place-items-center"
                          {...MUSIC_ICON_SWAP}
                        >
                          <span className="inline-grid size-11 place-items-center rounded-full bg-background/90 text-foreground shadow-[0_8px_20px_-10px_oklch(0_0_0/0.55)] transition-[scale] duration-150 ease-out group-active:scale-[0.96]">
                            <MusicPlayPauseIcon
                              isPlaying={isTrackPlaying}
                              iconClassName="size-6"
                            />
                          </span>
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <TrackTitle
                      text={track.title}
                      active={isActive || isTrackPlaying}
                      className="text-sm font-medium tracking-tight text-foreground"
                    />
                    <TrackTitle
                      text={track.artist}
                      active={isActive || isTrackPlaying}
                      className="text-sm tracking-tight text-muted-foreground"
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul
          className="-mx-1 flex w-[calc(100%+0.5rem)] min-w-0 flex-col"
          onKeyDown={onTracksKeyDown}
        >
          {sortedTracks.map((track) => {
            const isTrackPlaying = isPlaying && currentTrack?.id === track.id;
            const isActive =
              hoveredTrackId === track.id || focusedTrackId === track.id;

            return (
              <li key={track.id} className="min-w-0">
                <button
                  ref={(node) => setTrackButton(track.id, node)}
                  type="button"
                  tabIndex={track.id === tabStopId ? 0 : -1}
                  aria-pressed={isTrackPlaying}
                  onFocus={() => setFocusedTrackId(track.id)}
                  onMouseEnter={() => setHoveredTrackId(track.id)}
                  onMouseLeave={() =>
                    setHoveredTrackId((hoveredId) =>
                      hoveredId === track.id ? null : hoveredId,
                    )
                  }
                  onClick={() => toggleTrack(track, sortedTracks)}
                  className={cn(
                    "flex w-full items-center justify-between gap-6 rounded px-1 py-0.5 text-left text-sm tracking-tight select-none",
                    isTrackPlaying
                      ? "bg-rose-600 text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-background forced-colors:focus-visible:outline-[Highlight]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground",
                  )}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <Image
                      src={track.artworkUrl}
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      draggable={false}
                      className="size-5 shrink-0 rounded-xs bg-muted outline outline-foreground/10 -outline-offset-1"
                    />
                    <TrackTitle
                      text={track.title}
                      active={isActive || isTrackPlaying}
                      className={cn(
                        "flex-1",
                        isTrackPlaying ? "text-white" : "text-foreground",
                      )}
                    />
                  </span>
                  <span className="shrink-0">{track.artist}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </MotionConfig>
  );
}
