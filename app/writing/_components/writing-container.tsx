import { ViewContainer } from '@/components/layout/view-container';
import { cn } from '@/helpers';
import Link from 'next/link';
import { forwardRef } from 'react';

export type WritingContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const WritingContainer = forwardRef<
  HTMLDivElement,
  WritingContainerProps
>(({ className, ...props }, ref) => {
  return (
    <main ref={ref} className={cn('writing-container', className)} {...props}>
      <Link
        href="/"
        className="fixed top-6 left-6 w-fit text-xs font-medium text-black px-2 py-1 max-xl:hidden">
        Back to home
      </Link>
      <ViewContainer>{props.children}</ViewContainer>
    </main>
  );
});

WritingContainer.displayName = 'WritingContainer';
