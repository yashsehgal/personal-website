"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HugeiconsIcon, HugeiconsIconProps } from "@hugeicons/react";
import Image from "next/image";
import { ButtonHTMLAttributes, useMemo, useState } from "react";

type FeedPrimaryOptionContentType =
  | { icon: HugeiconsIconProps["icon"] }
  | { imageSrc: string };

interface FeedPrimaryOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  optionName: string;
  optionContent: FeedPrimaryOptionContentType;
  isOptionActive?: boolean;
}

export function FeedPrimaryOption({
  optionName,
  optionContent,
  className,
  isOptionActive,
  ...props
}: FeedPrimaryOptionProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = (): void => {
    if (isOptionActive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    if (isOptionActive) return;
    setIsHovered(false);
  };

  const safeIsContentTypeIcon = "icon" in optionContent;
  const safeIsContentTypeImage = "imageSrc" in optionContent;

  const safeMotionAnimateHeight = useMemo((): number => {
    if (isOptionActive) return 36;
    if (isHovered) return 18;
    return 0;
  }, [isHovered, isOptionActive]);

  const safeMotionAnimateScale = useMemo((): number => {
    if (isOptionActive) return 1;
    if (isHovered) return 1;
    return 0;
  }, [isHovered, isOptionActive]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="relative size-fit"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className={cn(
              "absolute rounded-full w-2 -left-4 top-1/2 -translate-y-1/2 bg-foreground",
            )}
            animate={{
              height: safeMotionAnimateHeight,
              scale: safeMotionAnimateScale,
            }}
            transition={{
              duration: 0.2,
              type: "tween",
              ease: "easeInOut",
            }}
          />
          <Button
            variant="secondary"
            className={cn(
              "size-11 p-0 flex items-center justify-center bg-foreground/6 hover:bg-foreground/10 rounded-xl",
              safeIsContentTypeIcon ? "" : "",
              safeIsContentTypeImage ? "overflow-hidden" : "",
              className,
            )}
            {...props}
          >
            {safeIsContentTypeIcon && (
              <HugeiconsIcon icon={optionContent.icon} />
            )}
            {safeIsContentTypeImage && (
              <Image
                src={optionContent.imageSrc}
                alt={optionName}
                width={32}
                height={32}
                className="object-covers size-full select-none pointer-events-none"
              />
            )}
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">{optionName}</TooltipContent>
    </Tooltip>
  );
}
