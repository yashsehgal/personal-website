"use client";
import { TABLER_ICON_STYLE } from "@/helpers/styles";
import { cn } from "@/helpers/utils";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
  TablerIcon,
} from "@tabler/icons-react";
import { motion, MotionProps } from "framer-motion";
import React, { MouseEvent, forwardRef, useState } from "react";

type ButtonSize = "md" | "lg";
const BUTTON_SIZE: Record<ButtonSize, string> = {
  md: "px-6 py-3 rounded-xl gap-2",
  lg: "px-8 py-4 rounded-xl gap-3 text-lg",
};

type ButtonVariant = "primary" | "secondary";
const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary:
    "border-transparent text-white bg-gradient-to-b from-indigo-500 to-indigo-600 hover:brightness-90 shadow-xl hover:shadow",
  secondary:
    "border-neutral-300 text-neutral-800 bg-neutral-50 hover:bg-neutral-100",
};

type ButtonExtendedMotionProps = MotionProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {};

export interface ButtonProps extends ButtonExtendedMotionProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  isLoading?: boolean;
  withArrow?: "leading" | "support" | "none";
  leadingIcon?: React.ReactNode;
  supportIcon?: React.ReactNode;
  stretch?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      size = "md",
      variant = "primary",
      isLoading = false,
      leadingIcon = undefined,
      supportIcon = undefined,
      withArrow = "none",
      stretch = false,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const LeadingIconRender = leadingIcon;
    const SupportIconRender = supportIcon;
    const [hover, setHover] = useState<boolean>(false);

    const handleButtonMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
      setHover(true);
      onMouseEnter && onMouseEnter(e);
    };
    const handleButtonMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
      setHover(false);
      onMouseLeave && onMouseLeave(e);
    };

    const TablerIconStyle =
      size === "lg" ? TABLER_ICON_STYLE.lg : TABLER_ICON_STYLE;

    return (
      <motion.button
        ref={ref}
        className={cn(
          "element-button",
          "border transition-all flex flex-row items-center justify-center",
          BUTTON_SIZE[size],
          BUTTON_VARIANT[variant],
          props.disabled && "opacity-60",
          isLoading && "gap-3 hover:gap-3",
          withArrow !== "none" &&
            (size === "md" ? "hover:gap-3" : "hover:gap-4"),
          stretch && "w-full",
          className,
        )}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        {...props}
      >
        {withArrow === "support" &&
          (hover ? (
            <IconArrowLeft {...TablerIconStyle} />
          ) : (
            <IconChevronLeft {...TablerIconStyle} />
          ))}
        {supportIcon && SupportIconRender}
        {children}
        {isLoading && (
          <IconLoader2 {...TablerIconStyle} className="animate-spin" />
        )}
        {LeadingIconRender && LeadingIconRender}
        {withArrow === "leading" &&
          (hover ? (
            <IconArrowRight {...TablerIconStyle} />
          ) : (
            <IconChevronRight {...TablerIconStyle} />
          ))}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export interface ResponsiveButtonContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ResponsiveButtonContainer = forwardRef<
  HTMLDivElement,
  ResponsiveButtonContainerProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "responsive-button-container flex items-center gap-4 max-md:grid max-md:w-full",
        className,
      )}
      {...props}
    />
  );
});

ResponsiveButtonContainer.displayName = "ResponsiveButtonContainer";
