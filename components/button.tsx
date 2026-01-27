import { cn } from '@/helpers/cn';

type ButtonVariantType = 'default';
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
        'button cursor-pointer flex items-center',
        variant === 'default' && 'text-foreground hover:bg-foreground/10',
        size === 'default' && 'py-0.5 px-1.5 rounded-md font-semibold gap-1.5',
        size === 'sm' && '',
        size === 'lg' && '',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
}
