"use client";

import { cn } from "cn";
import Image from "next/image";
import { useState } from "react";

type StackAiExperienceMediaSlotProps = {
  src?: string;
  alt?: string;
};

export function StackAiExperienceMediaSlot({
  src,
  alt = "",
}: StackAiExperienceMediaSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) {
    return <figure className="aspect-video w-full bg-muted" aria-hidden />;
  }

  return (
    <figure className="relative aspect-800/523 w-full overflow-hidden bg-muted">
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
