import { cn } from '@/helpers';
import { forwardRef } from 'react';

export type WritingContentProps = React.HTMLAttributes<HTMLDivElement>;

export const WritingContent = forwardRef<HTMLDivElement, WritingContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          'writing-content-wrapper leading-8 break-words mt-6',
          '[&>p]:mb-6 [&>p]:text-sm',
          '[&>b]:mb-6 [&>b]:text-sm',
          '[&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-sm [&>h3]:font-semibold',
          '[&>ul]:text-sm [&>ul]:mb-12',
          className,
        )}
        {...props}
      />
    );
  },
);

WritingContent.displayName = 'WritingContent';
