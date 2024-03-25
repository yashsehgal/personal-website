import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> { }

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, ...args }, ref) => <div ref={ref} className={cn("page-container pt-3 pb-6 grid w-full md:w-[60%] mx-auto", className)} {...args} />
)

PageContainer.displayName = "PageContainer";