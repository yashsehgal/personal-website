"use client";

import { cn } from "cn";
import { useState } from "react";

type ProgressiveImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  className?: string;
};

const SHARP_CLASS_NAME =
  "scale-100 opacity-100 blur-none motion-reduce:transition-none";
const BLURRED_CLASS_NAME = "scale-[1.02] opacity-0 blur-[2px]";

export function ProgressiveImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
  className,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const markLoadedIfReady = (image: HTMLImageElement | null) => {
    if (!image) return;

    const markLoaded = () => setIsLoaded(true);
    if (image.complete && image.naturalWidth > 0) {
      markLoaded();
      return;
    }

    image.addEventListener("load", markLoaded, { once: true });
    queueMicrotask(() => {
      if (image.complete && image.naturalWidth > 0) markLoaded();
    });
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img
        src={blurDataURL}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        className="absolute inset-0 size-full scale-110 object-cover blur-[20px] select-none"
        draggable={false}
      />
      <img
        ref={markLoadedIfReady}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "absolute inset-0 size-full object-cover select-none transition-[filter,opacity,scale] duration-300 ease-out motion-reduce:transition-none motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-none",
          isLoaded ? SHARP_CLASS_NAME : BLURRED_CLASS_NAME,
        )}
        draggable={false}
      />
    </div>
  );
}
