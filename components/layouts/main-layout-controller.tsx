import { ResponsiveLayoutController } from "@/components/layouts/responsive-layout-controller";
import { PrimaryNavigation } from "@/components/shared/primary-navigation";
import { cn } from "cn";

type MainLayoutControllerProps = React.HTMLAttributes<HTMLDivElement>;

export function MainLayoutController({
  className,
  children,
  ...props
}: MainLayoutControllerProps) {
  return (
    <div className={cn("pb-24", className)} {...props}>
      <PrimaryNavigation />
      <ResponsiveLayoutController>{children}</ResponsiveLayoutController>
    </div>
  );
}
