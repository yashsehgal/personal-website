"use client";

import { VideoPlayer } from "@/components/shared/video-player";
import { cn } from "cn";
import Image from "next/image";
import { useState, type ReactNode } from "react";

type StackAiExperienceMediaSlotProps = {
  src?: string;
  alt?: string;
  poster?: string;
  width?: number;
  height?: number;
  videoClassName?: string;
};

function isVideoSrc(src: string) {
  return /\.(mp4|webm)$/i.test(src);
}

function MediaFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-1.5",
        "shadow-[0px_1px_2px_-1px_oklch(0_0_0/0.06),0px_2px_4px_0px_oklch(0_0_0/0.04)]",
        "dark:shadow-none",
      )}
    >
      <div className="overflow-hidden rounded-md">{children}</div>
    </div>
  );
}

export function StackAiExperienceMediaSlot({
  src,
  alt = "",
  poster,
  width,
  height,
  videoClassName,
}: StackAiExperienceMediaSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) {
    return (
      <MediaFrame>
        <figure className="aspect-video w-full bg-muted" aria-hidden />
      </MediaFrame>
    );
  }

  if (isVideoSrc(src)) {
    return (
      <MediaFrame>
        <VideoPlayer
          src={src}
          poster={poster}
          alt={alt}
          width={width}
          height={height}
          videoClassName={videoClassName}
        />
      </MediaFrame>
    );
  }

  return (
    <MediaFrame>
      <figure
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          !(width && height) && "aspect-800/523",
        )}
        style={
          width && height ? { aspectRatio: `${width} / ${height}` } : undefined
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width: 42rem) 100vw, 42rem"
          draggable={false}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "object-contain",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
        />
      </figure>
    </MediaFrame>
  );
}
