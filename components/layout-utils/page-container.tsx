'use client';
import { cn } from '@/helpers/utils';
import { forwardRef } from 'react';

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('page-container', className)} {...props} />
    );
  },
);

PageContainer.displayName = 'PageContainer';
