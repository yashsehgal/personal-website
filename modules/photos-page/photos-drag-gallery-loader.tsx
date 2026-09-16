"use client";

import { PHOTOS } from "@/modules/photos-page/photos";
import dynamic from "next/dynamic";

const PhotosDragGallery = dynamic(
  () =>
    import("@/modules/photos-page/photos-drag-gallery").then((module) => ({
      default: module.PhotosDragGallery,
    })),
  {
    ssr: false,
    loading: () => <div className="min-h-80 w-full" aria-hidden />,
  },
);

export function PhotosDragGalleryLoader() {
  return <PhotosDragGallery photos={PHOTOS} />;
}
