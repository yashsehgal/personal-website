'use client';
import { cn } from '@/helpers';
import { forwardRef, useState } from 'react';

export type CodeBlockProps = React.HTMLAttributes<HTMLPreElement>;

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, children, lang = 'text', ...props }, ref) => {
    const CONTENT: string = children?.toString() ?? '';
    const [showCopied, setShowCopied] = useState<boolean>(false);

    const handleCopyCode = () => {
      setShowCopied(true);
      if (navigator && typeof navigator !== 'undefined') {
        navigator.clipboard
          .writeText(CONTENT)
          .then(() => {
            const copiedTimeout = setTimeout(() => {
              setShowCopied(false);
            }, 1600);

            return () => clearTimeout(copiedTimeout);
          })
          .catch((err) =>
            console.error('Error while copying code content', err),
          );
      }
    };

    return (
      <pre
        ref={ref}
        className={cn(
          'code-block text-xs font-medium text-gray-600 bg-gray-50 p-2 pt-5 rounded-xl border relative w-full mb-12 selection:bg-indigo-500 selection:text-white text-wrap',
          className,
        )}
        {...props}>
        {children}
        <p className="absolute text-xs px-2 py-0.5 rounded-md border bg-gray-50 -top-2 left-2 select-none">
          {lang}
        </p>
        <button
          className="absolute text-xs px-2 py-0.5 rounded-md border bg-gray-50 hover:bg-gray-100 -bottom-8 right-0 select-none"
          onClick={handleCopyCode}>
          {showCopied ? 'copied!' : 'copy'}
        </button>
      </pre>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
