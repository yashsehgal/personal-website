"use client";

import { IMAGE_PROFILE_MAIN } from "@/common/assets";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="size-32 overflow-hidden">
          <Image
            preload
            src={IMAGE_PROFILE_MAIN}
            alt="Profile"
            className="object-cover size-auto select-none pointer-events-none"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-6">
          <p className="text-base font-mono leading-0 tracking-tighter font-semibold">
            Yash Sehgal
          </p>
          <p className="text-base font-mono text-muted-foreground leading-0 tracking-tighter">
            Design Engineer
          </p>
        </div>
      </div>
    </div>
  );
}
