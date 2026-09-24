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
        "main-layout-container relative flex min-w-0 flex-col gap-8 p-8 wide:flex-row wide:items-start wide:justify-start wide:gap-0",
        className,
      )}
      {...props}
    >
      <MainSidebarNavigation />
      <main className="min-w-0 w-full wide:flex-1">{layoutMainContent}</main>
    </div>
  );
}
