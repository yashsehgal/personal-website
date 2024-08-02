"use client";
import { cn } from "@/helpers/utils";
import { forwardRef } from "react";

export interface ParagraphContentProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ParagraphContent = forwardRef<
  HTMLParagraphElement,
  ParagraphContentProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "paragraph-content text-neutral-500 text-2xl leading-loose max-w-[64ch] max-lg:text-xl max-lg:leading-10 max-md:leading-8 transition-all",
        className,
      )}
      {...props}
    />
  );
});

ParagraphContent.displayName = "ParagraphContent";
