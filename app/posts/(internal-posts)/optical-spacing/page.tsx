'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/helpers/cn';

export default function SpacingAndOpticalAlignmentPage() {
  return (
    <InternalPostContainer>
      <div className="space-y-12">
        <p className="text">
          When a user is looking at your design, in addition to a clean-looking
          layout, it&apos;s important to use better spacing to make the UI feel
          more breathable. Along with better spacing, we also need to present
          data in an optically aligned way.
        </p>
        <p className="text">
          This becomes more important when the UI has a lot of data and elements
          to show. Consider a hero section that has a headline, a small
          description, and 2 relevant actions to onboard users. In this example,
          even more than the colors we use for the primary button, the position
          of the Get started button becomes important.
        </p>
        <HeroSectionSpacingGuidelinesDemo />
        <p className="text">
          The example above uses a basic spacing rule that highlights the exact
          elements we want to show the customer. Because the description text is
          relatively less important, it uses a secondary text color and sits
          close to the main heading.
        </p>
        <p className="text">
          The heading has <code>font-semibold</code> and{' '}
          <code>tracking-tight</code> and a higher font-size so that it holds
          more visual attention.
        </p>
        <p className="text">
          For the spacing between hero section title and description, we are
          using <span className="font-serif italic">16px</span> as vertical
          spacing. Using <span className="font-serif italic">8px</span> as the
          base spacing unit, the next spacing used between the hero description
          and buttons container is the{' '}
          <span className="font-serif italic">
            (spacing between title and description) + (base spacing unit) = 16px
            + 8px = 24px
          </span>
          .
        </p>
        <p className="text">
          Now for the spacing between the primary and secondary button, we are
          going to use the exact spacing used between title and description.
        </p>
        <HeroSectionSpacingGuidelinesDemo showSpacingBetweenButtons />
      </div>
      <div className="space-y-12">
        <p className="text">
          The above shared spacing units are geometrically added, which means if
          there is some extra leading space coming from headings and paragraph
          texts, that will be included in the total optical spacing as well.
        </p>
        <ComponentPreviewContainer className="p-12 space-y-12 bg-white">
          <Image
            src="/optical-spacing-with-leading-example.svg"
            alt="total-optical-spacing"
            className="w-full"
            width={400}
            height={300}
          />
          <Image
            src="/optical-spacing-with-leading-calculation.svg"
            alt="total-optical-spacing"
            className="w-full"
            width={400}
            height={300}
          />
        </ComponentPreviewContainer>
        <p className="text">
          To keep the spacing consistent in these types of conditions, we can
          reduce the base spacing unit to{' '}
          <span className="font-serif italic">4px</span> so that the{' '}
          <span className="font-serif italic">total optical spacing</span>{' '}
          becomes <span className="font-serif italic">24px</span>.
        </p>
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
    <ComponentPreviewContainer
      className={cn(
        'h-96 relative pt-16',
        showSpacingBetweenButtons && 'max-lg:hidden',
      )}>
      <div className="hero-section-demo mx-auto w-2/3 space-y-8 max-md:w-4/5 max-sm:w-[90%]">
        <div className="space-y-4">
          <motion.h1
            className="font-semibold text-3xl tracking-tight max-sm:text-xl"
            animate={{
              filter: reduceOpacity ? 'blur(4px)' : undefined,
              opacity: reduceOpacity ? OPACITY : undefined,
            }}>
            Start creating finance agents using templates from the marketplace
          </motion.h1>
          <motion.p
            className="text-base text-secondary w-[90%] max-sm:text-sm"
            animate={{
              filter: reduceOpacity ? 'blur(4px)' : undefined,
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
            className="absolute h-6 guideline-block-horizontal top-[132px] max-sm:top-[116px]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ ease: 'easeIn' }}
          />
          <motion.div
            key="badge-between-title-description"
            className="w-fit px-1.5 absolute top-[131px] max-sm:top-[116px] py-1 scale-90 rounded-lg text-xs bg-red-50 text-red-500 font-mono font-medium border border-red-400 right-24 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}>
            16px
          </motion.div>
          <motion.div
            className="absolute h-[38px] guideline-block-horizontal top-[195px] max-sm:top-[171px]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ ease: 'easeIn', delay: 0.3 }}
          />
          <motion.div
            key="badge-between-content-button"
            className="w-fit px-1.5 absolute top-[201px] max-sm:top-[177px] py-1 scale-90 rounded-lg text-xs bg-blue-50 text-blue-500 font-mono font-medium border border-blue-400 right-24 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
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
            className="w-fit px-1.5 absolute bottom-[140px] py-1 rounded-lg text-xs bg-red-50 text-red-500  font-mono font-medium border border-red-400 left-[360px] dark:bg-red-950 dark:text-red-200 dark:border-red-900"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}>
            16px
          </motion.div>
        </>
      )}
      <div className="absolute z-20 w-full bg-background border-t border-foreground/10 flex items-center justify-center p-2 bottom-0">
        <button
          className="rounded-full p-4 py-2 border border-foreground/10 shadow-2xs text-foreground text-sm font-medium bg-background cursor-pointer"
          onClick={toggleGuidelinesVisibility}>
          {showGuidelines ? 'Hide guidelines' : 'Show guidelines'}
        </button>
      </div>
    </ComponentPreviewContainer>
  );
}
