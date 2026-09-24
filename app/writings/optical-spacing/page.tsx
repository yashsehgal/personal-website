"use client";

import { ArticleTitle } from "@/components/article-title";
import { ComponentPreviewContainer } from "@/components/component-preview-container";
import { cn } from "cn";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const copyClassName =
  "text-pretty tracking-tight leading-relaxed text-muted-foreground";

export default function OpticalSpacingPage() {
  return (
    <div className="mx-auto mt-16 flex w-full min-w-0 max-w-3xl flex-col items-start gap-10 px-1">
      <ArticleTitle title="Optical spacing" />
      <article className="flex w-full min-w-0 flex-col gap-12">
        <div className="space-y-12">
          <p className={copyClassName}>
            When a user is looking at your design, in addition to a
            clean-looking layout, it&apos;s important to use better spacing to
            make the UI feel more breathable. Along with better spacing, we
            also need to present data in an optically aligned way.
          </p>
          <p className={copyClassName}>
            This becomes more important when the UI has a lot of data and
            elements to show. Consider a hero section that has a headline, a
            small description, and 2 relevant actions to onboard users. In this
            example, even more than the colors we use for the primary button,
            the position of the Get started button becomes important.
          </p>
          <HeroSectionSpacingGuidelinesDemo />
          <p className={copyClassName}>
            The example above uses a basic spacing rule that highlights the
            exact elements we want to show the customer. Because the
            description text is relatively less important, it uses a secondary
            text color and sits close to the main heading.
          </p>
          <p className={copyClassName}>
            The heading has{" "}
            <code className="font-mono text-foreground">font-semibold</code> and{" "}
            <code className="font-mono text-foreground">tracking-tight</code> and
            a higher font-size so that it holds
            more visual attention.
          </p>
          <p className={copyClassName}>
            For the spacing between hero section title and description, we are
            using <span className="text-foreground">16px</span> as vertical
            spacing. Using <span className="text-foreground">8px</span> as the
            base spacing unit, the next spacing used between the hero
            description and buttons container is the{" "}
            <span className="text-foreground">
              (spacing between title and description) + (base spacing unit) =
              16px + 8px = 24px
            </span>
            .
          </p>
          <p className={copyClassName}>
            Now for the spacing between the primary and secondary button, we
            are going to use the exact spacing used between title and
            description.
          </p>
          <HeroSectionSpacingGuidelinesDemo showSpacingBetweenButtons />
        </div>
        <div className="space-y-12">
          <p className={copyClassName}>
            The above shared spacing units are geometrically added, which means
            if there is some extra leading space coming from headings and
            paragraph texts, that will be included in the total optical spacing
            as well.
          </p>
          <ComponentPreviewContainer className="optical-spacing-demo space-y-12 bg-white p-12 dark:bg-black">
            <Image
              src="/optical-spacing-with-leading-example.svg"
              alt="total-optical-spacing"
              className="w-full dark:invert"
              width={400}
              height={300}
            />
            <Image
              src="/optical-spacing-with-leading-calculation.svg"
              alt="total-optical-spacing"
              className="w-full dark:invert"
              width={400}
              height={300}
            />
          </ComponentPreviewContainer>
          <p className={copyClassName}>
            To keep the spacing consistent in these types of conditions, we can
            reduce the base spacing unit to{" "}
            <span className="text-foreground">4px</span> so that the{" "}
            <span className="text-foreground">total optical spacing</span>{" "}
            becomes <span className="text-foreground">24px</span>.
          </p>
        </div>
      </article>
    </div>
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
        "optical-spacing-demo relative h-96 pt-16",
        showSpacingBetweenButtons && "max-lg:hidden",
      )}
    >
      <div className="hero-section-demo mx-auto w-2/3 space-y-8 max-md:w-4/5 max-sm:w-[90%]">
        <div className="space-y-4">
          <motion.h1
            className="text-3xl font-semibold tracking-tight max-sm:text-xl"
            animate={{
              filter: reduceOpacity ? "blur(4px)" : undefined,
              opacity: reduceOpacity ? OPACITY : undefined,
            }}
          >
            Start creating finance agents using templates from the marketplace
          </motion.h1>
          <motion.p
            className="w-[90%] text-base text-secondary max-sm:text-sm"
            animate={{
              filter: reduceOpacity ? "blur(4px)" : undefined,
              opacity: reduceOpacity ? OPACITY : undefined,
            }}
          >
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
          transition={{ bounce: 0.2, type: "spring", ease: "easeInOut" }}
        >
          <button className="rounded-full bg-foreground p-4 py-2 text-sm font-medium text-background">
            Get started
          </button>
          <button className="rounded-full border border-foreground/10 p-4 py-2 text-sm font-medium text-foreground shadow-2xs">
            Learn more
          </button>
        </motion.div>
      </div>
      {showGuidelines && !showSpacingBetweenButtons && (
        <>
          <motion.div
            className="guideline-block-horizontal absolute top-[132px] h-6 max-sm:top-[116px]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ ease: "easeIn" }}
          />
          <motion.div
            key="badge-between-title-description"
            className="absolute top-[131px] right-24 w-fit scale-90 rounded-lg border border-red-400 bg-red-50 px-1.5 py-1 font-mono text-xs font-medium text-red-500 max-sm:top-[116px] dark:border-red-900 dark:bg-red-950 dark:text-red-200"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            16px
          </motion.div>
          <motion.div
            className="guideline-block-horizontal absolute top-[195px] h-[38px] max-sm:top-[171px]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ ease: "easeIn", delay: 0.3 }}
          />
          <motion.div
            key="badge-between-content-button"
            className="absolute top-[201px] right-24 w-fit scale-90 rounded-lg border border-blue-400 bg-blue-50 px-1.5 py-1 font-mono text-xs font-medium text-blue-500 max-sm:top-[177px] dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            24px
          </motion.div>
        </>
      )}
      {reduceOpacity && (
        <>
          <motion.div
            key="show-button-guideline"
            className="guideline-block-vertical absolute top-0 left-[370px] z-0 w-[24px]"
            initial={{ height: 0 }}
            animate={{ height: "360px" }}
            transition={{ ease: "easeIn" }}
          />
          <motion.div
            key="badge-between-buttons-container"
            className="absolute bottom-[140px] left-[360px] w-fit rounded-lg border border-red-400 bg-red-50 px-1.5 py-1 font-mono text-xs font-medium text-red-500 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            16px
          </motion.div>
        </>
      )}
      <div className="absolute bottom-0 z-20 flex w-full items-center justify-center border-t border-foreground/10 bg-background p-2">
        <button
          className="cursor-pointer rounded-full border border-foreground/10 bg-background p-4 py-2 text-sm font-medium text-foreground shadow-2xs"
          onClick={toggleGuidelinesVisibility}
        >
          {showGuidelines ? "Hide guidelines" : "Show guidelines"}
        </button>
      </div>
    </ComponentPreviewContainer>
  );
}
