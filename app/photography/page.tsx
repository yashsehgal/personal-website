"use client";

import { PHOTOGRAPHY_IMAGES } from "@/common/photography";
import Image from "next/image";

export default function Photography() {
  return (
    <div className="flex flex-col items-start gap-6 px-1">
      <h1 className="font-medium tracking-tight">Photography</h1>
      <div className="grid w-full grid-cols-1 items-start gap-12 wide:max-w-5xl wide:grid-cols-3">
        {PHOTOGRAPHY_IMAGES.map((photo, index) => {
          return (
            <div key={index} className="flex items-start flex-col gap-3">
              <Image
                src={photo.path}
                alt={photo.caption}
                width={1000}
                height={1000}
                className="aspect-auto h-auto w-full select-none wide:aspect-square wide:object-cover"
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
    </div>
  );
}
