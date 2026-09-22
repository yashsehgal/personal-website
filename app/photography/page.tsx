"use client";

import { PHOTOGRAPHY_IMAGES } from "@/common/photography";
import Image from "next/image";

export default function Photography() {
  return (
    <div className="flex flex-col gap-8 items-start">
      {PHOTOGRAPHY_IMAGES.map((photo, index) => {
        return (
          <div key={index} className="flex items-start flex-col w-xl">
            <Image
              src={photo.path}
              alt={photo.caption}
              width={1000}
              height={1000}
            />
          </div>
        );
      })}
    </div>
  );
}
