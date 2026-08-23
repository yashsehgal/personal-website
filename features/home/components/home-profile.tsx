import { IMAGE_PROFILE_MAIN } from "@/common/assets";
import Image from "next/image";

export function HomeProfile() {
  return (
    <div className="flex flex-col items-start justify-start gap-7">
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
      <div className="flex flex-col items-start justify-start gap-7">
        <p className="text-lg leading-0">Yash Sehgal</p>
        <p className="text-lg text-muted-foreground leading-0">
          Design Engineer
        </p>
      </div>
    </div>
  );
}
