import { cn } from '@/utils/cn';
import Anchor from './anchor';
import { ArrowLeft } from 'lucide-react';

const BackToHomeAction: React.FunctionComponent<
  React.HTMLAttributes<HTMLElement>
> = ({ className, ...props }) => {
  return (
    <Anchor
      className={cn(
        'back-to-home-action absolute top-12 left-16 flex flex-row items-center justify-start gap-2',
        className,
      )}
      {...props}
    >
      <ArrowLeft className='w-4' />
      {'Back to home'}
    </Anchor>
  );
};

export default BackToHomeAction;
