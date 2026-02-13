'use client';
import { ROUTES } from '@/common/route';
import { LinkButton } from '@/components/link-button';
import { SOCIALS } from '@/constants/socials';
import Link from 'next/link';

export function MainLayoutNavigation() {
  return (
    <header className="flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        <Link href={ROUTES.HOME}>
          <div className="size-5 rounded-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700" />
        </Link>
        <LinkButton
          href={SOCIALS.MAIL}
          target="_blank"
          variant="outline"
          className="max-md:hidden">
          Write to me via email
        </LinkButton>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link
          href={SOCIALS.X}
          className="text-base font-medium text-secondary hover:text-foreground"
          target="_blank">
          Follow me on X
        </Link>
        <Link
          href={SOCIALS.GITHUB}
          className="text-base font-medium text-secondary hover:text-foreground"
          target="_blank">
          GitHub
        </Link>
        <Link
          href={SOCIALS.LINKEDIN}
          className="text-base font-medium text-secondary hover:text-foreground"
          target="_blank">
          LinkedIn
        </Link>
      </div>
    </header>
  );
}
