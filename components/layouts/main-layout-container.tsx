import { ResponsiveControl } from "@/components/layouts/responsive-control";
import { MainNavigation } from "@/components/shared/main-navigation";

interface MainLayoutContainerProps {
  children: React.ReactNode;
}

export function MainLayoutContainer({ children }: MainLayoutContainerProps) {
  return (
    <div>
      <MainNavigation />
      <ResponsiveControl>{children}</ResponsiveControl>
    </div>
  );
}
