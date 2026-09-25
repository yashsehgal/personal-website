"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getPlaybackProgress,
  playNextTrack,
  playPreviousTrack,
  setMusicVolume,
  subscribeToPlaybackProgress,
  togglePlayback,
  useMusicPlayer,
} from "@/lib/music-player";
import { cn } from "cn";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from "react";

const iconTransition = { type: "spring" as const, duration: 0.3, bounce: 0 };

const VOLUME_TOOLTIP_DURATION_MS = 1000;
const CONTROL_TOOLTIP_DELAY_MS = 700;

const TRACK_DETAILS_CLASS_NAME =
  "flex min-w-0 flex-1 items-center gap-3 select-none";

const CONTROL_BUTTON_CLASS_NAME =
  "inline-grid place-items-center rounded-full text-foreground transition-[scale,background-color] duration-150 ease-out hover:bg-foreground/8 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-40";

const SWAP_ANIMATION = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  transition: iconTransition,
};

function ControlButton({
  label,
  className,
  children,
  ...props
}: Omit<ComponentProps<"button">, "aria-label" | "type"> & {
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        aria-label={label}
        className={cn(CONTROL_BUTTON_CLASS_NAME, className)}
        {...props}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className="surface-inverted">{label}</TooltipContent>
    </Tooltip>
  );
}

function PlayPauseButton({
  isPlaying,
  className,
}: {
  isPlaying: boolean;
  className?: string;
}) {
  return (
    <ControlButton
      label={isPlaying ? "Pause" : "Play"}
      onClick={togglePlayback}
      className={className}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isPlaying ? "pause" : "play"}
          className="flex items-center justify-center"
          {...SWAP_ANIMATION}
        >
          {isPlaying ? (
            <Pause aria-hidden="true" className="size-6 fill-current" />
          ) : (
            <Play
              aria-hidden="true"
              className="size-6 translate-x-px fill-current"
            />
          )}
        </motion.span>
      </AnimatePresence>
    </ControlButton>
  );
}

function formatTime(seconds: number) {
  const wholeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(wholeSeconds / 60);

  return `${minutes}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

function PlaybackProgress({ isPlaying }: { isPlaying: boolean }) {
  const barRef = useRef<HTMLSpanElement>(null);
  const [time, setTime] = useState({ elapsed: 0, duration: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const { currentTime, duration } = getPlaybackProgress();
      const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
      const elapsed = Math.floor(currentTime);
      const total = Math.floor(duration);

      barRef.current?.style.setProperty("scale", `${progress} 1`);
      setTime((previous) =>
        previous.elapsed === elapsed && previous.duration === total
          ? previous
          : { elapsed, duration: total },
      );
    };

    const tick = () => {
      update();
      frame = requestAnimationFrame(tick);
    };

    const unsubscribe = subscribeToPlaybackProgress(update);
    frame = requestAnimationFrame(isPlaying ? tick : update);

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col gap-1.5">
      <span
        aria-hidden="true"
        className="block h-0.75 overflow-hidden rounded-full bg-foreground/15"
      >
        <span
          ref={barRef}
          className="block h-full origin-left rounded-full bg-foreground"
          style={{ scale: "0 1" }}
        />
      </span>
      <div className="flex justify-between text-xs tracking-tight text-(--surface-muted-foreground) tabular-nums">
        <span>
          <span className="sr-only">Elapsed </span>
          {formatTime(time.elapsed)}
        </span>
        <span>
          <span className="sr-only">Duration </span>
          {formatTime(time.duration)}
        </span>
      </div>
    </div>
  );
}

export function MusicNowPlaying() {
  const { currentTrack, hasNextTrack, isPlaying, volume } = useMusicPlayer();
  const isExpanded = usePathname() === WEBSITE_ROUTES.APPS_MUSIC;
  const volumePercent = Math.round(volume * 100);
  const [isAdjustingVolume, setIsAdjustingVolume] = useState(false);
  const volumeTooltipTimerRef = useRef<number | null>(null);

  const showVolumeTooltip = () => {
    setIsAdjustingVolume(true);

    if (volumeTooltipTimerRef.current !== null) {
      window.clearTimeout(volumeTooltipTimerRef.current);
    }

    volumeTooltipTimerRef.current = window.setTimeout(() => {
      setIsAdjustingVolume(false);
      volumeTooltipTimerRef.current = null;
    }, VOLUME_TOOLTIP_DURATION_MS);
  };

  useEffect(
    () => () => {
      if (volumeTooltipTimerRef.current !== null) {
        window.clearTimeout(volumeTooltipTimerRef.current);
      }
    },
    [],
  );

  const trackDetails = currentTrack ? (
    <>
      <Image
        src={currentTrack.largeArtworkUrl}
        alt=""
        width={48}
        height={48}
        unoptimized
        draggable={false}
        className="size-12 shrink-0 rounded-md bg-muted outline outline-white/10 -outline-offset-1 dark:outline-black/10"
      />
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          title={currentTrack.title}
          className="truncate text-sm font-medium tracking-tight"
        >
          {currentTrack.title}
        </span>
        <span
          title={currentTrack.artist}
          className="truncate text-sm tracking-tight text-(--surface-muted-foreground)"
        >
          {currentTrack.artist}
        </span>
      </span>
    </>
  ) : null;

  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider delay={CONTROL_TOOLTIP_DELAY_MS}>
        <p role="status" className="sr-only">
          {currentTrack
            ? `Now playing ${currentTrack.title} by ${currentTrack.artist}`
            : ""}
        </p>
        <AnimatePresence>
          {currentTrack ? (
            <motion.section
              key="now-playing"
              aria-label="Now playing"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              className="surface-inverted sticky bottom-8 z-20 flex w-64 max-w-full flex-col self-start rounded-[20px] bg-background/90 p-3 text-foreground shadow-(--surface-edge) backdrop-blur-xl backdrop-saturate-150 wide:fixed wide:left-8"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <div className={TRACK_DETAILS_CLASS_NAME}>{trackDetails}</div>
                ) : (
                  <Link
                    href={WEBSITE_ROUTES.APPS_MUSIC}
                    className={cn(
                      TRACK_DETAILS_CLASS_NAME,
                      "after:absolute after:inset-0 after:rounded-[20px]",
                    )}
                  >
                    <span className="sr-only">Open Music: </span>
                    {trackDetails}
                  </Link>
                )}
                <AnimatePresence mode="popLayout" initial={false}>
                  {isExpanded ? null : (
                    <motion.span
                      key="play-pause"
                      className="flex shrink-0 items-center justify-center"
                      {...SWAP_ANIMATION}
                    >
                      <PlayPauseButton
                        isPlaying={isPlaying}
                        className="relative z-10 size-10"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div
                inert={!isExpanded}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  isExpanded
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="flex flex-col gap-3 pt-3">
                    <PlaybackProgress isPlaying={isPlaying} />
                    <div className="flex items-center justify-evenly">
                      <ControlButton
                        label="Previous track"
                        onClick={playPreviousTrack}
                        className="size-10"
                      >
                        <SkipBack
                          aria-hidden="true"
                          className="size-5 fill-current"
                        />
                      </ControlButton>
                      <PlayPauseButton
                        isPlaying={isPlaying}
                        className="size-11"
                      />
                      <ControlButton
                        label="Next track"
                        onClick={playNextTrack}
                        disabled={!hasNextTrack}
                        className="size-10"
                      >
                        <SkipForward
                          aria-hidden="true"
                          className="size-5 fill-current"
                        />
                      </ControlButton>
                    </div>
                    <div className="flex items-center gap-2 text-(--surface-muted-foreground)">
                      <Volume aria-hidden="true" className="size-4 shrink-0" />
                      <span className="group relative flex min-w-0 flex-1">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={volumePercent}
                          aria-label="Volume"
                          aria-valuetext={`${volumePercent}%`}
                          onChange={(event) => {
                            setMusicVolume(
                              Number(event.currentTarget.value) / 100,
                            );
                            showVolumeTooltip();
                          }}
                          className="volume-slider min-w-0 flex-1"
                          style={
                            { "--volume": `${volumePercent}%` } as CSSProperties
                          }
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "pointer-events-none absolute bottom-full mb-0.5 origin-bottom -translate-x-1/2 rounded-md bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-tight text-background tabular-nums transition-[opacity,scale] duration-150 ease-out select-none",
                            isAdjustingVolume
                              ? "scale-100 opacity-100"
                              : "scale-[0.96] opacity-0 group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100 group-has-[:focus-visible]:scale-100 group-has-[:focus-visible]:opacity-100",
                          )}
                          style={{
                            left: `calc(0.375rem + (100% - 0.75rem) * ${volume})`,
                          }}
                        >
                          {volumePercent}%
                        </span>
                      </span>
                      <Volume2 aria-hidden="true" className="size-4 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </TooltipProvider>
    </MotionConfig>
  );
}
