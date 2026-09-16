import { photoAlt } from "@/modules/photos-page/photo-layout";
import { PhotosDragGalleryLoader } from "@/modules/photos-page/photos-drag-gallery-loader";
import { PHOTOS } from "@/modules/photos-page/photos";

export function PhotosGallerySection() {
  return (
    <section aria-label="Photo gallery">
      <PhotosDragGalleryLoader />
      <ul className="sr-only">
        {PHOTOS.map((photo) => (
          <li key={photo.src}>
            {/* Decorative canvas has no per-image nodes; keep alts in the accessibility tree. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photoAlt(photo.src)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
