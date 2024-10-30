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
          className,
        )}
        {...props}
      />
    );
  },
);

WritingContent.displayName = 'WritingContent';
