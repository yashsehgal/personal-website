"use client";

import { PHOTOGRAPHY_IMAGES } from "@/common/photography";
import Image from "next/image";

export default function Photography() {
  return (
    <div className="grid grid-cols-3 gap-12 items-start w-5xl">
      {PHOTOGRAPHY_IMAGES.map((photo, index) => {
        return (
          <div key={index} className="flex items-start flex-col gap-3">
            <Image
              src={photo.path}
              alt={photo.caption}
              width={1000}
              height={1000}
              className="w-full h-auto select-none aspect-square object-cover"
              draggable={false}
              priority
              quality={100}
              unoptimized
              loading="eager"
              fetchPriority="high"
            />
            <div className="space-y-0.5">
              <p className="text-base tracking-tight font-medium">
                {photo.caption}
              </p>
              <p className="text-base tracking-tight">{photo.location}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
