import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ResponsiveControlProps
  extends React.HTMLAttributes<HTMLDivElement> { }

export const ResponsiveControl = forwardRef<
  HTMLDivElement,
  ResponsiveControlProps
>(({ className, ...args }, ref) => <div
  ref={ref}
  className={cn(
    'box-border mx-auto overflow-x-hidden overflow-y-scroll',
    'px-8',
    className,
  )}
  {...args}
/>);

ResponsiveControl.displayName = 'ResponsiveControl';
