import { cn } from '@/lib/utils';

type ButtonSizeType = 'small' | 'medium' | 'large';

type ButtonVariantType = 'primary' | 'solid' | 'outline';

interface CraftedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  fullWidth?: boolean;
}

const CraftedButtonSizeClass = {
  small: 'px-3 py-1.5 rounded text-sm font-normal',
  medium: 'px-4 py-2 rounded-md text-base font-normal',
  large: 'px-6 py-3 rounded-lg text-lg font-normal',
};

const CraftedButtonVariantClass = {
  primary:
    'bg-orange-500 text-white border-transparent hover:brightness-105 active:brightness-110',
  solid:
    'bg-gray-900 text-gray-200 border-transparent hover:brightness-105 active:brightness-110',
  outline: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50',
};

const CraftedButtonFullWidthClass = 'w-full';

const CraftedButton: React.FunctionComponent<CraftedButtonProps> = ({
  size = 'medium',
  variant = 'primary',
  fullWidth = false,
  className,
  ...attr
}) => {
  const buttonStyleClass = cn(
    'transition-all flex flex-row items-center justify-center gap-1 border shadow-lg active:shadow',
    CraftedButtonVariantClass[variant],
    CraftedButtonSizeClass[size],
    fullWidth && CraftedButtonFullWidthClass,
  );
  return (
    <button className={cn(buttonStyleClass, className)} {...attr}>
      {attr?.children}
    </button>
  );
};

export default CraftedButton;
