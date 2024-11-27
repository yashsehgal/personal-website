import { cn } from '@/helpers';

export function AutomationLogLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn(
        'AutomationLogLabel text-xs font-medium px-2 flex items-center justify-center py-0.5 rounded-full shrink-0 bg-neutral-100 text-neutral-500',
        className,
      )}
      {...props}
    />
  );
}
