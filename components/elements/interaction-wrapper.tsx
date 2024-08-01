"use client";
import { cn } from "@/helpers/utils";
import { motion, MotionProps } from "framer-motion";
import { forwardRef } from "react";

type InteractionWrapperMotionExtendedProps = MotionProps &
  React.HTMLAttributes<HTMLDivElement> & {
    withCursorPointer?: boolean;
  };

export interface InteractionWrapperProps
  extends InteractionWrapperMotionExtendedProps {}

export const InteractionWrapper = forwardRef<
  HTMLDivElement,
  InteractionWrapperProps
>(({ className, withCursorPointer = false, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "interaction-wrapper inline-block w-fit h-fit",
        withCursorPointer && "cursor-pointer",
        className,
      )}
      {...props}
    />
  );
});

InteractionWrapper.displayName = "InteractionWrapper";
