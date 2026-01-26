'use client';

import { ApplicationRoute, ROUTES } from '@/common/route';
import Link from 'next/link';

const NAVIGATION_OPTIONS: { title: string; route: ApplicationRoute }[] = [
  { title: '/', route: ROUTES.HOME },
  { title: 'About', route: ROUTES.ABOUT },
  { title: 'Work', route: ROUTES.WORK },
  { title: 'Articles', route: ROUTES.ARTICLES },
  { title: 'Art', route: ROUTES.ART },
] as const;

export function MainLayoutNavigation() {
  return (
    <div className="main-layout-navigation flex flex-col items-start gap-1">
      {NAVIGATION_OPTIONS.map((option, index) => {
        return (
          <Link
            key={index}
            href={option.route}
            className="text-xl font-semibold text-secondary hover:text-foreground">
            {option.title}
          </Link>
        );
      })}
    </div>
  );
}
