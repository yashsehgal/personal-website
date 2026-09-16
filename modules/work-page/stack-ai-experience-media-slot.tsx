"use client";

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

  const isVideo = isVideoSrc(src);
  const canShow = isLoaded || Boolean(poster);

  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden bg-muted",
        !(width && height) && (isVideo ? "aspect-video" : "aspect-800/523"),
      )}
      style={
        width && height ? { aspectRatio: `${width} / ${height}` } : undefined
      }
    >
      {isVideo ? (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          muted
          preload="metadata"
          aria-label={alt}
          onLoadedData={() => setIsLoaded(true)}
          className={cn(
            "absolute inset-0 size-full object-contain",
            canShow ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
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
      )}
    </figure>
  );
}
