import { cn } from '@/helpers/cn';

type ButtonVariantType = 'default' | 'outline' | 'solid';
type ButtonSizeType = 'default' | 'sm' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
}

export function Button({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'button cursor-pointer flex items-center select-none',
        variant === 'default' && 'text-foreground hover:bg-foreground/10',
        variant === 'outline' &&
          'text-foreground border border-foreground/10 hover:bg-foreground/5',
        variant === 'solid' &&
          'text-white bg-green-700 hover:bg-green-800 dark:bg-green-800 dark:hover:bg-green-700',
        size === 'default' && 'px-3 h-8 rounded-md font-medium text-sm',
        size === 'sm' && 'py-0.5 px-1.5 rounded-md gap-1.5',
        size === 'lg' &&
          'text-xl py-0.5 px-1.5 rounded-lg font-semibold gap-1.5',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
}
