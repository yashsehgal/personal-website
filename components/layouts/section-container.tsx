import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> { }

export const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ className, ...args }, ref) => <section ref={ref} className={cn("section-container py-4", className)} {...args} />
)

SectionContainer.displayName = "SectionContainer";