"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import { ArrowLeft, Check, Link2 } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const iconButtonClassName =
  "inline-flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-150 ease-out hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.96]";

const iconTransition = { type: "spring" as const, duration: 0.3, bounce: 0 };

export function ArticleTitle({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      return;
    }

    setCopied(true);
    if (copiedTimeoutRef.current) {
      window.clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <Link
          href={WEBSITE_ROUTES.WRITINGS}
          aria-label="Back to writings"
          className={iconButtonClassName}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
        </Link>
        <button
          type="button"
          aria-label={copied ? "Link copied" : "Copy link"}
          className={iconButtonClassName}
          onClick={copyLink}
        >
          <MotionConfig reducedMotion="user">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={copied ? "copied" : "copy"}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                transition={iconTransition}
              >
                {copied ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <Link2 aria-hidden="true" className="size-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </MotionConfig>
        </button>
      </div>
      <h1 className="mt-20 font-medium tracking-tight">{title}</h1>
    </div>
  );
}
