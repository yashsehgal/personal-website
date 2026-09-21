import { MainSidebarNavigation } from "@/components/layouts/main-sidebar-navigation";
import { cn } from "cn";

type MainLayoutContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function MainLayoutContainer({
  className,
  children: layoutMainContent,
  ...props
}: MainLayoutContainerProps) {
  return (
    <div
      className={cn(
        "main-layout-container p-8 flex items-start justify-between",
        className,
      )}
      {...props}
    >
      <MainSidebarNavigation />
      <main>{layoutMainContent}</main>
    </div>
  );
}
