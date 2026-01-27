'use client';

import { ApplicationRoute, ROUTES } from '@/common/route';
import { cn } from '@/helpers/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAVIGATION_OPTIONS: { title: string; route: ApplicationRoute }[] = [
  { title: 'Home', route: ROUTES.HOME },
  { title: 'About', route: ROUTES.ABOUT },
  { title: 'Work', route: ROUTES.WORK },
  { title: 'Posts', route: ROUTES.POSTS },
  { title: 'Art', route: ROUTES.ART },
] as const;

export function MainLayoutNavigation() {
  const pathname = usePathname();
  const isPathActive = (route: ApplicationRoute): boolean => route === pathname;

  return (
    <div className="main-layout-navigation flex flex-col items-start gap-1 w-80 max-lg:w-fit">
      {NAVIGATION_OPTIONS.map((option, index) => {
        return (
          <Link
            key={index}
            href={option.route}
            className={cn(
              'text-xl font-semibold',
              isPathActive(option.route)
                ? 'text-foreground'
                : 'text-secondary hover:text-foreground',
            )}>
            {option.title}
          </Link>
        );
      })}
    </div>
  );
}
