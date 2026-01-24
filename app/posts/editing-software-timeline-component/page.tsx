'use client';

import { LayersContainer } from '@/app/posts/editing-software-timeline-component/components/video-layers';
import { cn } from '@/helpers/cn';
import { useState } from 'react';

export default function PostEditingSoftwareTimelineComponentPage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'p-6 space-y-8 h-full flex flex-col items-center justify-center',
        darkMode && 'bg-neutral-900',
      )}>
      <div
        className={cn(
          'h-[520px] w-3xl flex flex-col gap-16 items-center justify-center',
        )}>
        <LayersContainer darkMode={darkMode} />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={cn(
            'bg-white border border-neutral-200 rounded-lg px-3 py-1',
            darkMode && 'border-transparent bg-neutral-800 text-white',
          )}>
          Toggle to {darkMode ? 'light mode' : 'dark mode'}
        </button>
      </div>
    </div>
  );
}
