import { ViewContainer } from '@/components/layout/view-container';
import { cn } from '@/helpers';
import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { forwardRef } from 'react';

export type WritingContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const WritingContainer = forwardRef<
  HTMLDivElement,
  WritingContainerProps
>(({ className, ...props }, ref) => {
  return (
    <main ref={ref} className={cn('writing-container', className)} {...props}>
      <Link href="/" className="text-inherit max-lg:hidden">
        <button className="absolute top-12 left-12 font-semibold text-sm flex gap-2 items-center">
          <IconChevronLeft size={14} />
          Back
        </button>
      </Link>
      <ViewContainer>{props.children}</ViewContainer>
    </main>
  );
});

WritingContainer.displayName = 'WritingContainer';
