import { cn } from "cn";

type ComponentPreviewContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function ComponentPreviewContainer({
  className,
  ...props
}: ComponentPreviewContainerProps) {
  return (
    <div
      className={cn(
        "component-preview-container min-h-4 overflow-hidden rounded-2xl border border-foreground/10 shadow-2xs",
        className,
      )}
      {...props}
    />
  );
}
