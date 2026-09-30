import { IMAGE_PLACEHOLDERS } from "@/common/image-placeholders";
import { PHOTOGRAPHY_IMAGES } from "@/common/photography";
import { ProgressiveImage } from "@/components/progressive-image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function Gallery() {
  return (
    <div className="flex flex-col items-start gap-6 px-1 wide:mt-16">
      <h1 className="font-medium tracking-tight">Gallery</h1>
      <div className="flex w-full flex-wrap items-start gap-12">
        {PHOTOGRAPHY_IMAGES.map((photo) => {
          const placeholder = IMAGE_PLACEHOLDERS[photo.path];

          return (
            <div
              key={photo.path}
              className="flex w-full min-w-0 flex-col items-start gap-3 wide:w-auto wide:max-w-sm wide:min-w-64 wide:flex-[1_1_16rem]"
            >
              <ProgressiveImage
                src={photo.path}
                alt={photo.caption}
                width={placeholder.width}
                height={placeholder.height}
                blurDataURL={placeholder.blurDataURL}
                className="wide:!aspect-square"
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
