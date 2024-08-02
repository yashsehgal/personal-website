import { cn } from "@/helpers/utils";
import Image from "next/image";
import { forwardRef } from "react";

export const BannerImage = forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, alt = "banner-image", ...props }, ref) => {
  return (
    <Image
      ref={ref}
      className={cn("banner-image w-[250px] h-auto rounded-2xl shadow-xl")}
      alt={alt}
      width={250}
      height={300}
      {...props}
    />
  );
});

BannerImage.displayName = "BannerImage";
