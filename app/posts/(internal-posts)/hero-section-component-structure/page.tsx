'use client';
import { Button } from '@/components/button';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import {
  HeroSection,
  HeroSectionActionsContainer,
  HeroSectionDescription,
  HeroSectionPrimaryAction,
  HeroSectionSecondaryAction,
  HeroSectionTitle,
} from '@/components/examples/hero-section';
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
      <HeroSectionDemoConsoleWithAlignmentOptions />
      <div className="space-y-12">
        <p className="text">
          The demo shown above for a hero section is an example how we can
          collectively use smaller components to make one parent component. The
          title, heading and buttons are written into their separate components.
        </p>
        <p className="text">
          Along with that, we can have our own custom features based on the UI
          requirements. In this example, we have enabled this component with an
          alignment prop.
        </p>
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
    <ComponentPreviewContainer className="relative h-96 max-lg:h-80">
      <HeroSection
        alignment={selectedAlignmentOption}
        className="p-16 max-lg:p-8">
        <HeroSectionTitle>
          Explore templates for your next AI Agent
        </HeroSectionTitle>
        <HeroSectionDescription>
          The marketplace has a wide range of templates from various IT,
          Engineering departments.
        </HeroSectionDescription>
        <HeroSectionActionsContainer>
          <HeroSectionPrimaryAction>Get started</HeroSectionPrimaryAction>
          <HeroSectionSecondaryAction>Learn more</HeroSectionSecondaryAction>
        </HeroSectionActionsContainer>
      </HeroSection>
      <div className="h-16 absolute w-full bottom-0 border-t border-foreground/10 flex items-center justify-center gap-2 bg-secondary/2">
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
