'use client';
import { ApplicationRoute } from '@/common/route';
import { getInternalPostData } from '@/constants/interal-posts';
import { cn } from '@/helpers/cn';
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
      <header className="internal-post-container-header">
        <h1 className="font-semibold">{internalPostTitle}</h1>
      </header>
      <main className="internal-post-container-main-content [&_.text]:leading-7 [&_h2]:font-medium space-y-24">
        {children}
      </main>
    </div>
  );
}
