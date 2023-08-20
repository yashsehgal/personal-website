import { HeadlineType } from '@/types/components';
import { cn } from '@/utils/cn';

const Headline: React.FunctionComponent<HeadlineType> = ({ className, children, size = 'base', ...props }) => {
  const HeadlineVariants: {
    base: React.HTMLAttributes<HTMLHeadingElement> | any;
    large: React.HTMLAttributes<HTMLHeadingElement> | any;
    'x-large': React.HTMLAttributes<HTMLHeadingElement> | any;
  } = {
    base: (
      <h2 className={cn('heading-base text-lg font-semibold leading-snug', className)} {...props}>
        {children}
      </h2>
    ),
    large: (
      <h1 className={cn('headling-large text-2xl font-bold leading-snug', className)} {...props}>
        {children}
      </h1>
    ),
    'x-large': (
      <h1 className={cn('heading-x-large text-4xl font-bold leading-snug', className)} {...props}>
        {children}
      </h1>
    ),
  };

  return HeadlineVariants[size];
};

export default Headline;
