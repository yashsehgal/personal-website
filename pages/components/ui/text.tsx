import { TextType } from '@/types/components';
import { cn } from '@/utils/cn';

const Text: React.FunctionComponent<TextType> = ({
  className,
  children,
  size = 'base',
  ...props
}) => {
  return (
    <p
      className={cn(
        'page-text leading-5 tracking-wide text-neutral-700',
        className,
        size === 'base' && 'font-normal text-base',
        size === 'large' && 'font-medium text-lg',
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
