'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SpacingAndOpticalAlignmentPage() {
  return (
    <InternalPostContainer>
      <div className="space-y-12">
        <p className="text">
          When a user is looking at your design, along with a clean looking
          design, it is important to have better spacing, making the UI more
          breathable. Including better spacing, we also need to put the data in
          an optically aligned manner.
        </p>
        <p className="text">
          This becomes more important when the UI has a lot of data and elements
          to show. Consider a hero section that has a headline, a small
          description and 2 relevant actions for onboarding the users. In this
          example, more than the colors we use for the primary button, the
          position of the Get started button becomes important.
        </p>
        <HeroSectionSpacingGuidelinesDemo />
        <p className="text">
          The above example uses a basic spacing rule which is used to highlight
          the exact elements we want to show to the customer. Description text
          being a relatively less important has a secondary text color and is
          close to the main heading.
        </p>
        <p className="text">
          The heading has <code>font-semibold</code> and{' '}
          <code>tracking-tight</code> and a higher font-size so that it holds
          more visual attention.
        </p>
        <p className="text">
          For the spacing between hero section title and description, we are
          using <code>16px</code> as horizontal spacing. Using <code>8px</code>{' '}
          as the base spacing unit, the next spacing used between the hero
          description and buttons container, is the{' '}
          <span className="font-serif italic">
            (spacing between title and description) + (base spacing unit) = 16px
            + 8px = 24px
          </span>
        </p>
        <p className="text">
          Now for the spacing between the primary and secondary button, we are
          going to use the exact spacing used between title and description.
        </p>
        <HeroSectionSpacingGuidelinesDemo showSpacingBetweenButtons />
      </div>
    </InternalPostContainer>
  );
}

function HeroSectionSpacingGuidelinesDemo({
  showSpacingBetweenButtons = false,
}: {
  showSpacingBetweenButtons?: boolean;
}) {
  const [showGuidelines, setShowGuidelines] = useState<boolean>(false);

  const toggleGuidelinesVisibility = () => setShowGuidelines((show) => !show);

  const OPACITY: number = 0 as const;
  const reduceOpacity: boolean = showSpacingBetweenButtons && showGuidelines;

  return (
    <ComponentPreviewContainer className="h-96 relative pt-16">
      <div className="hero-section-demo mx-auto w-2/3 space-y-8">
        <div className="space-y-4">
          <motion.h1
            className="font-semibold text-3xl tracking-tight"
            animate={{
              opacity: reduceOpacity ? OPACITY : undefined,
            }}>
            Start creating finance agents using templates from the marketplace
          </motion.h1>
          <motion.p
            className="text-base text-secondary w-[90%]"
            animate={{
              opacity: reduceOpacity ? OPACITY : undefined,
            }}>
            Create powerful finance agents using ready-made, customizable
            templates available in the marketplace.
          </motion.p>
        </div>
        <motion.div
          key="hero-section-buttons-container"
          className="flex items-center justify-start gap-4"
          animate={{
            scale: reduceOpacity ? 1.5 : undefined,
            y: reduceOpacity ? -80 : undefined,
            x: reduceOpacity ? 210 : undefined,
          }}
          transition={{ bounce: 0.2, type: 'spring', ease: 'easeInOut' }}>
          <button className="rounded-full p-4 py-2 bg-foreground text-background text-sm font-medium">
            Get started
          </button>
          <button className="rounded-full p-4 py-2 border border-foreground/10 shadow-2xs text-foreground text-sm font-medium">
            Learn more
          </button>
        </motion.div>
      </div>
      {showGuidelines && !showSpacingBetweenButtons && (
        <>
          {/* lines between hero section title and description */}
          <motion.div
            className="absolute h-6 guideline-block-horizontal top-[132px]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ ease: 'easeIn' }}
          />
          <motion.div
            key="badge-between-title-description"
            className="w-fit px-1.5 absolute top-[131px] py-1 scale-90 rounded-lg text-xs bg-red-50 text-red-500 font-mono font-medium border border-red-400 right-24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}>
            16px
          </motion.div>
          <motion.div
            className="absolute h-[38px] guideline-block-horizontal top-[195px]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ ease: 'easeIn', delay: 0.3 }}
          />
          <motion.div
            key="badge-between-content-button"
            className="w-fit px-1.5 absolute top-[201px] py-1 scale-90 rounded-lg text-xs bg-blue-50 text-blue-500 font-mono font-medium border border-blue-400 right-24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}>
            24px
          </motion.div>
        </>
      )}
      {reduceOpacity && (
        <>
          <motion.div
            key="show-button-guideline"
            className="absolute guideline-block-vertical top-0 left-[370px] w-[24px] z-0"
            initial={{ height: 0 }}
            animate={{ height: '360px' }}
            transition={{ ease: 'easeIn' }}
          />
          <motion.div
            key="badge-between-buttons-container"
            className="w-fit px-1.5 absolute bottom-[140px] py-1 rounded-lg text-xs bg-red-50 text-red-500 font-mono font-medium border border-red-400 left-[360px]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}>
            16px
          </motion.div>
        </>
      )}
      <div className="absolute z-20 w-full bg-white border-t border-foreground/10 flex items-center justify-center p-2 bottom-0">
        <button
          className="rounded-full p-4 py-2 border border-foreground/10 shadow-2xs text-foreground text-sm font-medium bg-white cursor-pointer"
          onClick={toggleGuidelinesVisibility}>
          {showGuidelines ? 'Hide guidelines' : 'Show guidelines'}
        </button>
      </div>
    </ComponentPreviewContainer>
  );
}
