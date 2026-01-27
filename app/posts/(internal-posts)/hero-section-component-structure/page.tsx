'use client';
import { Button } from '@/components/button';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { cn } from '@/helpers/cn';
import { useState } from 'react';

export default function HeroSectionComponentStructurePage() {
  return (
    <InternalPostContainer>
      <p className="text">
        This hero section is the most simple and commonly used pattern for both
        marketing-led landing pages and data-intensive dashboard pages. Consider
        an example for showing templates inside a writing platform that has a
        hero section on top. In real life, the section can also be reused on the
        marketing page for showing templates.
      </p>
      <div className="">
        <HeroSectionDemoConsoleWithAlignmentOptions />
      </div>
    </InternalPostContainer>
  );
}

type AlignmentOptions = 'left' | 'center' | 'right';

export function HeroSectionDemoConsoleWithAlignmentOptions() {
  const [selectedAlignmentOption, setSelectedAlignmentOption] =
    useState<AlignmentOptions>('left');

  const isSelectedAlignment = (alignment: AlignmentOptions) =>
    selectedAlignmentOption === alignment;

  const handleChangeSelectedAlignment = (alignment: AlignmentOptions) =>
    setSelectedAlignmentOption(alignment);

  return (
    <ComponentPreviewContainer className="relative h-96">
      <div className="h-16 absolute w-full bottom-0 border-t border-foreground/10 flex items-center justify-center gap-2">
        <button
          className={cn(
            'px-6 py-2 border rounded-full cursor-pointer',
            isSelectedAlignment('left')
              ? 'border-transparent bg-foreground text-background'
              : 'border-foreground/10 bg-background hover:bg-foreground/5',
          )}
          onClick={() => handleChangeSelectedAlignment('left')}>
          Left
        </button>
        <button
          className={cn(
            'px-6 py-2 border rounded-full cursor-pointer',
            isSelectedAlignment('center')
              ? 'border-transparent bg-foreground text-background'
              : 'border-foreground/10 bg-background hover:bg-foreground/5',
          )}
          onClick={() => handleChangeSelectedAlignment('center')}>
          Center
        </button>
        <button
          className={cn(
            'px-6 py-2 border rounded-full cursor-pointer',
            isSelectedAlignment('right')
              ? 'border-transparent bg-foreground text-background'
              : 'border-foreground/10 bg-background hover:bg-foreground/5',
          )}
          onClick={() => handleChangeSelectedAlignment('right')}>
          Right
        </button>
      </div>
    </ComponentPreviewContainer>
  );
}
