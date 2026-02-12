import { cn } from '@/helpers/cn';
import Link, { LinkProps } from 'next/link';

type LinkButtonVariantType = 'default' | 'outline' | 'solid';
type LinkButtonSizeType = 'default' | 'sm' | 'lg';

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    variant?: LinkButtonVariantType;
    size?: LinkButtonSizeType;
  };

export function LinkButton({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: LinkButtonProps) {
  return (
    <Link
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
    </Link>
  );
}
