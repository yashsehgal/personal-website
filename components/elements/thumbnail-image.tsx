"use client";
import { cn } from "@/helpers/utils";
import Image from "next/image";
import { forwardRef } from "react";

const THUMBNAIL_IMAGE_QUALITY: number = 200;

export type ThumbnailImageSize = "sm" | "md" | "lg";

export interface ThumbnailImageExtendedProps {
  size?: ThumbnailImageSize;
}

export const ThumbnailImage = forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image> & ThumbnailImageExtendedProps
>(({ className, alt = "thumbnail-image", size = "sm", ...props }, ref) => {
  return (
    <Image
      ref={ref}
      width={THUMBNAIL_IMAGE_QUALITY}
      height={THUMBNAIL_IMAGE_QUALITY}
      className={cn(
        "thumbnail-image",
        // SIZE-based styles
        size === "sm" &&
          "w-[80px] h-[80px] border-4 shadow rounded-2xl max-md:w-[64px] max-md:h-[64px] max-md:border-2",
        size === "md" &&
          "w-[120px] h-[120px] border-8 shadow-lg rounded-3xl max-md:w-[80px] max-md:h-[80px] max-md:border-4",
        size === "lg" &&
          "w-[160px] h-[160px] border-8 shadow-2xl rounded-3xl max-md:w-[120px] max-md:h-[120px] max-md:border-4",
        // DEFAULT thumbnail component styles
        "border-white shadow-neutral-200 transition-all select-none",
        className,
      )}
      alt={alt}
      {...props}
    />
  );
});

ThumbnailImage.displayName = "ThumbnailImage";
