import { cn } from '@/helpers/cn';

type ComponentPreviewContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function ComponentPreviewContainer({
  className,
  ...props
}: ComponentPreviewContainerProps) {
  return (
    <div
      className={cn(
        'component-preview-container rounded-2xl overflow-hidden shadow-2xs min-h-4 border border-foreground/10',
        className,
      )}
      {...props}
    />
  );
}
