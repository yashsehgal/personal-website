import { cn } from "cn";

type ResponsiveLayoutControllerProps = React.HTMLAttributes<HTMLDivElement>;

export function ResponsiveLayoutController({
  className,
  ...props
}: ResponsiveLayoutControllerProps) {
  return <div className={cn("max-w-6xl mx-auto", className)} {...props} />;
}
