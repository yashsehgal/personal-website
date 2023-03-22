import { cn } from '@/lib/utils';

const Callout: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...attr }) => {
  return (
    <div
      className={cn(
        'rounded-lg bg-orange-100 text-zinc-700 text-sm font-normal p-4 leading-6',
        className,
      )}
      {...attr}>
      {attr?.children}
    </div>
  );
};

export default Callout;
