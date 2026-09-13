import { cn } from "cn";

type ResponsiveControlProps = React.HTMLAttributes<HTMLDivElement>;

export function ResponsiveControl({
  className,
  ...props
}: ResponsiveControlProps) {
  return <div className={cn("mx-auto w-7xl", className)} {...props} />;
}
