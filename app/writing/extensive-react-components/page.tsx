'use client';
import Link from 'next/link';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { CodeBlock } from '../_components/code-block';
import { DemoBlock, DemoBlockFooter } from '../_components/demo-block';
import { useState } from 'react';
import {
  ButtonSize,
  ButtonVariant,
  DemoButton,
} from './_components/demo-button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function PostExtensiveReactComponents() {
  const [demoButton, setDemoButton] = useState<{
    variant: ButtonVariant;
    size: ButtonSize;
    isLoading: boolean;
    stretch: boolean;
    rightIcon: boolean;
    leftIcon: boolean;
  }>({
    variant: 'primary',
    size: 'md',
    isLoading: false,
    stretch: false,
    rightIcon: false,
    leftIcon: false,
  });

  const DemoHandler = {
    changeVariant: (variant: ButtonVariant) => {
      setDemoButton({
        ...demoButton,
        variant,
      });
    },
    changeSize: (size: ButtonSize) => {
      setDemoButton({
        ...demoButton,
        size,
      });
    },
    toggleLoading: () => {
      setDemoButton({
        ...demoButton,
        isLoading: !demoButton.isLoading,
      });
    },
    toggleStretch: () => {
      setDemoButton({
        ...demoButton,
        stretch: !demoButton.stretch,
      });
    },
    toggleRightIcon: () => {
      setDemoButton({
        ...demoButton,
        rightIcon: !demoButton.rightIcon,
      });
    },
    toggleLeftIcon: () => {
      setDemoButton({
        ...demoButton,
        leftIcon: !demoButton.leftIcon,
      });
    },
  };

  return (
    <WritingContainer id="post__extensive-react-components">
      <WritingHeader>
        <WritingHeadline>
          how i write extensive react components (ui elements)
        </WritingHeadline>
        <WritingDetails>Thursday, 31st Oct, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <p>
          with the high adoption of tools such as{' '}
          <Link href="https://nextjs.org/" target="_blank">
            next-js
          </Link>
          ,{' '}
          <Link href="https://ui.shadcn.com" target="_blank">
            shadcn-ui
          </Link>
          ,{' '}
          <Link href="https://tailwindcss.com/" target="_blank">
            tailwindcss
          </Link>{' '}
          and{' '}
          <Link href="https://www.framer.com/motion/" target="_blank">
            framer-motion
          </Link>
          , there are so many coding patterns coming in picture to follow. some
          focus more on the accessibility part of things and some are more on
          the design and aesthetic end. in such cases, following a single coding
          pattern becomes tough, while making sure that your code is accessible,
          aesthetically pleasing with all the CSS and animation tinkering.
        </p>
        <p>
          according to my learnings and the components i have been building, i
          have been following the shared coding pattern for writing react
          components. this uses basic typescript utilities for making components
          with better DX and making sure they are native.
        </p>
        <p>
          for this explanation, let&apos;s take an example of a button
          component, with some initial set of variants and sizes.
        </p>
        <p>
          the button component will contain all the native-button properties.
          following we will add the listed properties:
        </p>
        <ul className="text-sm list-inside">
          <li className="list-item list-disc">
            <b>variant</b> - primary, secondary, ghost etc.
          </li>
          <li className="list-item list-disc">
            <b>size</b> - sm, md, lg
          </li>
          <li className="list-item list-disc">
            <b>rightIcon</b> - prop to render an icon in the right slot
          </li>
          <li className="list-item list-disc">
            <b>leftIcon</b> - prop to render an icon in the right slot
          </li>
          <li className="list-item list-disc">
            <b>stretch</b> - to cover the full width inside a container,
            relatively.
          </li>
          <li className="list-item list-disc">
            <b>isLoading</b> - to show loader icon on API calls & dummy loading
            states.
          </li>
        </ul>
        <h3>🧮 play around with the component</h3>
        <DemoBlock>
          <DemoButton
            variant={demoButton.variant}
            size={demoButton.size}
            isLoading={demoButton.isLoading}
            stretch={demoButton.stretch}
            rightIcon={demoButton.rightIcon ? IconChevronRight : undefined}
            leftIcon={demoButton.leftIcon ? IconChevronLeft : undefined}>
            Button
          </DemoButton>
          <DemoBlockFooter className="flex items-center gap-3 flex-wrap justify-center">
            <select
              value={demoButton.variant}
              onChange={(e) =>
                DemoHandler.changeVariant(e.target.value as ButtonVariant)
              }>
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="ghost">ghost</option>
            </select>
            <select
              value={demoButton.size}
              onChange={(e) =>
                DemoHandler.changeSize(e.target.value as ButtonSize)
              }>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="loading-toggle"
                checked={demoButton.isLoading}
                onChange={() => DemoHandler.toggleLoading()}
              />
              <label className="text-xs" htmlFor="loading-toggle">
                Show loading
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="right-icon-toggle"
                checked={demoButton.rightIcon}
                onChange={() => DemoHandler.toggleRightIcon()}
              />
              <label className="text-xs" htmlFor="right-icon-toggle">
                right icon
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="left-icon-toggle"
                checked={demoButton.leftIcon}
                onChange={() => DemoHandler.toggleLeftIcon()}
              />
              <label className="text-xs" htmlFor="left-icon-toggle">
                left icon
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="stretch-toggle"
                checked={demoButton.stretch}
                onChange={() => DemoHandler.toggleStretch()}
              />
              <label className="text-xs" htmlFor="stretch-toggle">
                stretch
              </label>
            </div>
          </DemoBlockFooter>
        </DemoBlock>
        <h3>🌱 starting with a basic interface for component props</h3>
        <p>
          here i am using the native type for button components as a extension
          to the component props
        </p>
        <CodeBlock lang="tsx">
          {
            'export interface ButtonProps extends React.ButtonHTMLAtrributes<HTMLButtonElement> {}'
          }
        </CodeBlock>
        <p>
          to the same interface, we can add custom properties using individual
          types
        </p>
        <CodeBlock lang="tsx">
          {`export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAtrributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  rightIcon?: TablerIcon;
  leftIcon?: TablerIcon;
  stretch?: boolean;
}`}
        </CodeBlock>
        <p>
          for icons, i am using{' '}
          <Link href="https://tabler.io/docs/icons/react" target="_blank">
            tabler icons
          </Link>{' '}
          in this example.
        </p>
        <h3>🎨 Writing styles for individual variants and sizes</h3>
        <p>
          create a utility function to manage our class names using the clsx and
          tailwind-merge packages. this helps us handle class name conflicts and
          conditional styling:
        </p>
        <CodeBlock lang="tsx">
          {`import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        </CodeBlock>
        <p>
          now, let&apos;s define our button styles using tailwind classes.
          we&apos;ll create an object to store our variant and size mappings:
        </p>
        <CodeBlock lang="tsx">
          {`const buttonVariants = {
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
};`}
        </CodeBlock>
        <h3>🧱 writing the main react component</h3>
        <p>
          now as the interface and types are prepared, we will write a single
          component for button using{' '}
          <Link
            href="https://react.dev/reference/react/forwardRef"
            target="_blank">
            forwardRef
          </Link>
          , we&apos;ll also add handling for our variants, sizes, and icons:
        </p>
        <CodeBlock>
          {`import React from 'react';
import { Loader2 } from 'tabler-icons-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './styles';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
    ref
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
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
  }
);

Button.displayName = 'Button';`}
        </CodeBlock>
        <h3>✨ ending notes</h3>
        <p>
          remember to always consider accessibility when building components.
          this includes proper aria labels, keyboard navigation, and focus
          states - which we&apos;ve included in our base styles. you can extend
          this pattern to create other components like input fields, select
          dropdowns, and more complex UI elements while maintaining the same
          structure and consistency.
        </p>
        <p>keep building!</p>
      </WritingContent>
    </WritingContainer>
  );
}
