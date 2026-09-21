import { MainSidebarNavigation } from "@/components/layouts/main-sidebar-navigation";
import { cn } from "cn";
import Image from "next/image";

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
      <Image
        src="/assets/initials.svg"
        alt="Yash Sehgal"
        width={100}
        height={100}
        className="pointer-events-none fixed z-10 size-10 start-8 bottom-8 select-none dark:invert"
        draggable={false}
        priority
        quality={100}
        unoptimized
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
