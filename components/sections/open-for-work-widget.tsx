import { IconMail } from '@tabler/icons-react';
import Link from 'next/link';

export function OpenForWorkWidget() {
  return (
    <div className="open-for-work-widget space-y-12 flex flex-col items-center justify-center mt-24 w-full">
      <div className="w-56 h-px bg-foreground/10" />
      <div className="bg-background w-full divide-y border border-foreground/10 rounded-2xl overflow-hidden">
        <div className="p-6 flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-start">
          <div className="space-y-1">
            <p className="text-base font-medium">
              I am currently open for work
            </p>
            <p className="text-base text-secondary">
              Let&apos;s connect if you like my work and want to hire a design
              engineer.
            </p>
          </div>
          <Link
            href="mailto:yashsehgal.work@gmail.com"
            target="_blank"
            className="rounded-full p-4 py-2 border border-foreground/10 shadow-2xs text-background bg-foreground text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
            <IconMail size={16} />
            <span>Write me a mail</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
