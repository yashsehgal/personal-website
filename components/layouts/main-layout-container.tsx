"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import { MainSidebarNavigation } from "@/components/layouts/main-sidebar-navigation";
import { cn } from "cn";
import Image from "next/image";
import { usePathname } from "next/navigation";

type MainLayoutContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function MainLayoutContainer({
  className,
  children: layoutMainContent,
  ...props
}: MainLayoutContainerProps) {
  const pathname = usePathname();
  const isHomePage = pathname === WEBSITE_ROUTES.HOME;

  return (
    <div
      className={cn(
        "main-layout-container relative p-8",
        isHomePage
          ? "flex min-h-dvh flex-col justify-between"
          : "flex items-start justify-start",
        className,
      )}
      {...props}
    >
      <MainSidebarNavigation />
      <main>{layoutMainContent}</main>
      {isHomePage ? null : (
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
      )}
    </div>
  );
}
