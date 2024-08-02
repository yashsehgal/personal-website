"use client";

import { cn } from "@/helpers/utils";
import { forwardRef } from "react";

export interface SectionContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export const SectionContainer = forwardRef<
  HTMLDivElement,
  SectionContainerProps
>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("section-container border-y", className)}
      {...props}
    />
  );
});

SectionContainer.displayName = "SectionContainer";
