import { cn } from '@/helpers/cn';
import Link, { LinkProps } from 'next/link';

type LinkButtonVariantType = 'default';
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
        'button cursor-pointer flex items-center',
        variant === 'default' && 'text-foreground hover:bg-foreground/10',
        size === 'default' &&
          'py-0.5 px-1.5 rounded-md font-semibold gap-1.5 hover:text-foreground',
        size === 'sm' && '',
        size === 'lg' && '',
        className,
      )}
      {...props}>
      {children}
    </Link>
  );
}
