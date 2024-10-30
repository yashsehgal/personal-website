import { cn } from '@/helpers';
import { forwardRef } from 'react';

type ViewContainerProps = React.HTMLAttributes<HTMLDivElement>;

const ViewContainer = forwardRef<HTMLDivElement, ViewContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'box-border mx-auto',
          'w-[640px] max-md:w-[360px]',
          className,
        )}
        {...props}>
        {children}
      </div>
    );
  },
);

ViewContainer.displayName = 'ViewContainer';

export { ViewContainer };

export type { ViewContainerProps };
