import { PhotosGallerySection } from "@/modules/photos-page/photos-gallery-section";
import { PhotosHeaderSection } from "@/modules/photos-page/photos-header-section";

export default function Photos() {
  return (
    <div>
      <div className="mt-20 mb-18">
        <PhotosHeaderSection />
      </div>
      <div className="mb-24 flex flex-col gap-6">
        <div className="h-px w-full bg-muted" />
        <PhotosGallerySection />
      </div>
    </div>
  );
}
