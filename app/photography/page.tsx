import { IMAGE_PLACEHOLDERS } from "@/common/image-placeholders";
import { PHOTOGRAPHY_IMAGES } from "@/common/photography";
import { ProgressiveImage } from "@/components/progressive-image";

export default function Photography() {
  return (
    <div className="flex flex-col items-start gap-6 px-1">
      <h1 className="font-medium tracking-tight">Photography</h1>
      <div className="grid w-full grid-cols-1 items-start gap-12 wide:max-w-5xl wide:grid-cols-3">
        {PHOTOGRAPHY_IMAGES.map((photo) => {
          const placeholder = IMAGE_PLACEHOLDERS[photo.path];

          return (
            <div key={photo.path} className="flex items-start flex-col gap-3">
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
