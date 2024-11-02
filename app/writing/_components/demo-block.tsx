import { cn } from '@/helpers';
import React, { forwardRef } from 'react';

export interface DemoBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  note?: string;
}

export type DemoBlockFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const DemoBlock = forwardRef<HTMLDivElement, DemoBlockProps>(
  ({ className, children, note = '', ...props }, ref) => {
    return (
      <div className="demo-block-wrapper space-y-3">
        <div
          ref={ref}
          className={cn(
            'demo-block w-full relative overflow-hidden border rounded-2xl min-h-[240px] flex items-center justify-center',
            className,
          )}
          {...props}>
          {children}
        </div>
        {note.length ? (
          <p className="text-xs text-neutral-50 text-center">{note}</p>
        ) : null}
      </div>
    );
  },
);

DemoBlock.displayName = 'DemoBlock';

export const DemoBlockFooter = forwardRef<HTMLDivElement, DemoBlockFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'demo-block-footer absolute bottom-0 left-0 w-full p-2 border-t bg-gray-50',
          '[&>select]:text-sm [&>select]:px-3 [&>select]:py-1 [&>select]:border [&>select]:rounded-lg',
          '[&>button]:text-sm [&>button]:px-2 [&>button]:py-0.5 [&>button]:rounded-lg [&>button]:bg-black/5 hover:[&>button]:bg-black/10',
          className,
        )}
        {...props}
      />
    );
  },
);

DemoBlockFooter.displayName = 'DemoBlockFooter';
