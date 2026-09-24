"use client";

import { cn } from "cn";
import { useEffect, useRef, useState } from "react";

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
const BLURRED_CLASS_NAME = "scale-110 opacity-0 blur-[20px]";

export function ProgressiveImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
  className,
}: ProgressiveImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [src]);

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
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "absolute inset-0 size-full object-cover select-none transition-[filter,opacity,scale] duration-700 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-none",
          isLoaded ? SHARP_CLASS_NAME : BLURRED_CLASS_NAME,
        )}
        draggable={false}
      />
    </div>
  );
}
