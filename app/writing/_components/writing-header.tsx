import { cn } from '@/helpers';
import React, { forwardRef } from 'react';

export type WritingHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type WritingHeadlineProps = React.HTMLAttributes<HTMLHeadingElement>;
export type WritingDetailsProps = React.HTMLAttributes<HTMLParagraphElement>;

export const WritingHeader = forwardRef<HTMLDivElement, WritingHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('writing-header space-y-2', className)}
        {...props}
      />
    );
  },
);

WritingHeader.displayName = 'WritingHeader';

export const WritingHeadline = forwardRef<
  HTMLHeadingElement,
  WritingHeadlineProps
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        'writing-headling tracking-tight font-semibold text-2xl',
        className,
      )}
      {...props}
    />
  );
});

WritingHeadline.displayName = 'WritingHeadline';

export const WritingDetails = forwardRef<
  HTMLParagraphElement,
  WritingDetailsProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('writing-details text-sm text-gray-500', className)}
      {...props}>
      Posted on {children}
    </p>
  );
});

WritingDetails.displayName = 'WritingDetails';
