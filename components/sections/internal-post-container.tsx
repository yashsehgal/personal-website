'use client';
import { ApplicationRoute, ROUTES } from '@/common/route';
import { LinkButton } from '@/components/link-button';
import { OpenForWorkWidget } from '@/components/sections/open-for-work-widget';
import { getInternalPostData } from '@/constants/interal-posts';
import { cn } from '@/helpers/cn';
import { IconArrowLeft } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

type InternalPostContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function InternalPostContainer({
  className,
  children,
  ...props
}: InternalPostContainerProps) {
  const pathname = usePathname();
  const internalPostTitle: string =
    getInternalPostData(pathname as unknown as ApplicationRoute)?.title ?? '';

  return (
    <div
      className={cn(
        'internal-post-container w-3xl mx-auto space-y-12 max-lg:w-full',
        className,
      )}
      {...props}>
      <div className="flex items-center justify-between gap-4">
        <LinkButton
          href={ROUTES.POSTS}
          className="w-fit text-secondary hover:text-foreground">
          <IconArrowLeft size={16} />
          <span>Back</span>
        </LinkButton>
      </div>
      <header className="internal-post-container-header">
        <h1 className="font-semibold">{internalPostTitle}</h1>
      </header>
      <main className="internal-post-container-main-content [&_.text]:leading-7 [&_h2]:font-medium space-y-24">
        {children}
      </main>
      <OpenForWorkWidget />
    </div>
  );
}
