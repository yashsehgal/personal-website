'use client';

import { ApplicationRoute, ROUTES } from '@/common/route';
import { cn } from '@/helpers/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainLayoutNavigation() {
  const pathname = usePathname();
  const isPathActive = (route: ApplicationRoute): boolean => route === pathname;

  return (
    <header className="flex items-center gap-4 justify-start">
      <Link href={ROUTES.HOME} className="text-base font-semibold">
        Yash Sehgal
      </Link>
      <div className="flex items-center gap-3 text-base">
        <Link
          href={ROUTES.POSTS}
          className={cn(
            'text-secondary hover:text-foreground',
            isPathActive(ROUTES.POSTS)
              ? 'text-foreground underline underline-offset-2'
              : '',
          )}>
          Posts
        </Link>
        <Link
          href={ROUTES.ABOUT}
          className={cn(
            'text-secondary hover:text-foreground',
            isPathActive(ROUTES.ABOUT)
              ? 'text-foreground underline underline-offset-2'
              : '',
          )}>
          About
        </Link>
      </div>
    </header>
  );
}
