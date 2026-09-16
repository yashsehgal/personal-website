"use client";

import { Slider } from "@base-ui/react/slider";
import { cn } from "cn";
import { Pause, Play } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function VideoPlayer({
  src,
  poster,
  alt = "",
  width,
  height,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isScrubbingRef = useRef(false);
  const seekLabelId = useId();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const canShow = isLoaded || Boolean(poster);
  const showChrome = !isPlaying || isHovered || isFocusWithin;
  const hasDuration = duration > 0;

  const syncFromVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || isScrubbingRef.current) {
      return;
    }

    setCurrentTime(video.currentTime);
    if (Number.isFinite(video.duration)) {
      setDuration(video.duration);
    }
  }, []);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    syncFromVideo();

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [syncFromVideo]);

  const seekTo = (nextTime: number) => {
    const video = videoRef.current;
    const clamped = Math.min(Math.max(nextTime, 0), duration || 0);
    setCurrentTime(clamped);
    if (video) {
      video.currentTime = clamped;
    }
  };

  const handleSeekChange = (value: number) => {
    isScrubbingRef.current = true;
    seekTo(value);
  };

  const handleSeekCommit = () => {
    isScrubbingRef.current = false;
    syncFromVideo();
  };

  const handlePlayerClick = () => {
    togglePlayback();
  };

  const stopPlaybackToggle = (event: ReactPointerEvent) => {
    event.stopPropagation();
  };

  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden bg-muted",
        !(width && height) && "aspect-video",
        className,
      )}
      style={
        width && height ? { aspectRatio: `${width} / ${height}` } : undefined
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusWithin(false);
        }
      }}
      onClick={handlePlayerClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
        preload="metadata"
        aria-label={alt}
        onLoadedData={() => {
          setIsLoaded(true);
          syncFromVideo();
        }}
        onLoadedMetadata={syncFromVideo}
        onDurationChange={syncFromVideo}
        onTimeUpdate={syncFromVideo}
        className={cn(
          "pointer-events-none absolute inset-0 size-full object-contain",
          canShow ? "opacity-100" : "opacity-0",
        )}
      />

      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={(event) => {
          event.stopPropagation();
          togglePlayback();
        }}
        className={cn(
          "absolute top-1/2 left-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-[0_8px_32px_oklch(0_0_0/0.28)] backdrop-blur-xl",
          "outline-none select-none",
          "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "motion-safe:transition-[opacity,scale] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.2,0,0,1)]",
          "motion-safe:active:scale-[0.96]",
          "motion-reduce:transition-opacity motion-reduce:duration-150",
          showChrome
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <span className="relative flex size-6 items-center justify-center">
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center pl-0.5",
              "motion-safe:transition-[opacity,filter,scale] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.2,0,0,1)]",
              "motion-reduce:transition-opacity motion-reduce:duration-150",
              isPlaying
                ? "scale-[0.25] opacity-0 blur-xs motion-reduce:scale-100 motion-reduce:blur-0"
                : "scale-100 opacity-100 blur-0",
            )}
            aria-hidden
          >
            <Play className="size-6 fill-current stroke-none" />
          </span>
          <span
            className={cn(
              "flex items-center justify-center",
              "motion-safe:transition-[opacity,filter,scale] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.2,0,0,1)]",
              "motion-reduce:transition-opacity motion-reduce:duration-150",
              isPlaying
                ? "scale-100 opacity-100 blur-0"
                : "scale-[0.25] opacity-0 blur-xs motion-reduce:scale-100 motion-reduce:blur-0",
            )}
            aria-hidden
          >
            <Pause className="size-6 fill-current stroke-none" />
          </span>
        </span>
      </button>

      <div
        className="absolute inset-x-3 bottom-3 z-10 flex h-9 items-center gap-3 rounded-full bg-black/55 px-3 text-xs text-white tabular-nums backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={stopPlaybackToggle}
      >
        <span className="w-10 shrink-0 text-white/90">{formatTime(currentTime)}</span>
        <Slider.Root
          className="flex min-w-0 flex-1 touch-none items-center select-none"
          value={currentTime}
          min={0}
          max={hasDuration ? duration : 1}
          step={0.05}
          disabled={!hasDuration}
          onValueChange={handleSeekChange}
          onValueCommitted={handleSeekCommit}
        >
          <Slider.Control className="relative flex h-9 w-full items-center">
            <Slider.Track className="relative h-0.75 w-full grow rounded-full bg-white/30">
              <Slider.Indicator className="rounded-full bg-white" />
            </Slider.Track>
            <Slider.Thumb
              aria-labelledby={seekLabelId}
              className="size-3 rounded-full bg-white outline-none select-none focus-visible:ring-2 focus-visible:ring-white"
            />
          </Slider.Control>
        </Slider.Root>
        <span id={seekLabelId} className="sr-only">
          Seek
        </span>
        <span className="w-10 shrink-0 text-right text-white/90">
          {formatTime(duration)}
        </span>
      </div>
    </figure>
  );
}
