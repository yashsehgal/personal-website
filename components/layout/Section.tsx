import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

const Section: React.FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  ...attr
}) => {
  return (
    <section className={cn('my-6 py-2', attr?.className)} {...attr}>
      {attr?.children}
    </section>
  );
};

export default Section;
