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
      <h1 className="text-base font-semibold">Yash Sehgal</h1>
      <div className="flex items-center gap-3 text-base"></div>
    </header>
  );
}
