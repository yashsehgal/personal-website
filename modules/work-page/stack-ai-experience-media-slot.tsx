"use client";

import { VideoPlayer } from "@/components/shared/video-player";
import { cn } from "cn";
import Image from "next/image";
import { useState } from "react";

type StackAiExperienceMediaSlotProps = {
  src?: string;
  alt?: string;
  poster?: string;
  width?: number;
  height?: number;
};

function isVideoSrc(src: string) {
  return /\.(mp4|webm)$/i.test(src);
}

export function StackAiExperienceMediaSlot({
  src,
  alt = "",
  poster,
  width,
  height,
}: StackAiExperienceMediaSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) {
    return <figure className="aspect-video w-full bg-muted" aria-hidden />;
  }

  if (isVideoSrc(src)) {
    return (
      <VideoPlayer
        src={src}
        poster={poster}
        alt={alt}
        width={width}
        height={height}
      />
    );
  }

  return (
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
  );
}
