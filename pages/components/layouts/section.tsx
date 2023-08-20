import { SectionType } from '@/types/layouts';
import { cn } from '@/utils/cn';

const Section: React.FunctionComponent<SectionType> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn('page-section', className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
