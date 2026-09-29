"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { playEmailCopiedSound } from "@/lib/interface-sounds";
import { cn } from "cn";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";

const iconTransition = { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const };

export const copyIconButtonClassName =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-150 ease-out hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.96]";

type CopyIconButtonProps = {
  label: string;
  copiedLabel: string;
  getValue: () => string | Promise<string>;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  className?: string;
};

export function CopyIconButton({
  label,
  copiedLabel,
  getValue,
  icon: Icon,
  className,
}: CopyIconButtonProps) {
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const copyValue = async () => {
    try {
      const value = await getValue();
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    playEmailCopiedSound();
    setCopied(true);
    if (copiedTimeoutRef.current) {
      window.clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        aria-label={copied ? copiedLabel : label}
        className={cn(copyIconButtonClassName, className)}
        onClick={copyValue}
      >
        <MotionConfig reducedMotion="user">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "copied" : "copy"}
              className="flex items-center justify-center"
              initial={{ opacity: 0, transform: "scale(0.95)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0.95)" }}
              transition={iconTransition}
            >
              {copied ? (
                <Check aria-hidden="true" className="size-4" />
              ) : (
                <Icon aria-hidden="true" className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </MotionConfig>
      </TooltipTrigger>
      <TooltipContent>{copied ? copiedLabel : label}</TooltipContent>
    </Tooltip>
  );
}
