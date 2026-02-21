'use client';
import { ApplicationRoute } from '@/common/route';
import { getInternalWritingData } from '@/constants/internal-writings';
import { cn } from '@/helpers/cn';
import { usePathname } from 'next/navigation';

type InternalWritingContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function InternalWritingContainer({
  className,
  children,
  ...props
}: InternalWritingContainerProps) {
  const pathname = usePathname();
  const internalWritingTitle: string =
    getInternalWritingData(pathname as unknown as ApplicationRoute)?.title ??
    '';

  return (
    <div
      className={cn(
        'internal-writing-container w-3xl mx-auto space-y-12 max-lg:w-full',
        className,
      )}
      {...props}>
      <header className="internal-writing-container-header">
        <h1 className="font-semibold">{internalWritingTitle}</h1>
      </header>
      <main className="internal-writing-container-main-content [&_h2]:font-medium space-y-8 [&_p]:text-justify [&_p]:font-serif">
        {children}
      </main>
    </div>
  );
}
