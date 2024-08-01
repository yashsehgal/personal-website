'use client';
import { cn } from '@/helpers/utils';
import { forwardRef } from 'react';

export interface ResponsiveContentControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export const ResponsiveContentControl = forwardRef<
  HTMLDivElement,
  ResponsiveContentControlProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'responsive-control',
        'box-border mx-auto',
        'w-[1100px] max-2xl:w-[1200px] max-xl:w-[920px] max-lg:w-[680px] max-md:w-[440px] max-sm:w-[340px]',
        className,
      )}
      {...props}
    />
  );
});

ResponsiveContentControl.displayName = 'ResponsiveContentControl';
