import React from 'react';
import { type TablerIcon, IconLoader2 } from '@tabler/icons-react';
import { cn } from '@/helpers';

// types for button variants and sizes
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// component props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  rightIcon?: TablerIcon;
  leftIcon?: TablerIcon;
  stretch?: boolean;
}

// button styles configuration
const buttonVariants = {
  base: [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'font-medium',
    'border',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ].join(' '),
  variant: {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 border-transparent',
    secondary: 'bg-white text-black hover:bg-gray-100',
    ghost: 'hover:bg-gray-100 border-transparent',
  },
  size: {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-8 text-base',
  },
};

export const DemoButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      stretch = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants.base,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          stretch && 'w-full',
          className,
        )}
        {...props}>
        {isLoading ? (
          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          LeftIcon && (
            <LeftIcon
              className={cn('h-4 w-4', children ? 'mr-2' : '')}
              aria-hidden="true"
            />
          )
        )}
        {children}
        {!isLoading && RightIcon && (
          <RightIcon
            className={cn('h-4 w-4', children ? 'ml-2' : '')}
            aria-hidden="true"
          />
        )}
      </button>
    );
  },
);

// Add display name for better debugging
DemoButton.displayName = 'DemoButton';
