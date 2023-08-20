import { ViewContainerType } from '@/types/layouts';
import { cn } from '@/utils/cn';

const ViewContainer: React.FunctionComponent<ViewContainerType> = ({ className, children, ...props }) => {
  return (
    <div className={cn('view-container', className)} {...props}>
      {children}
    </div>
  );
};

export default ViewContainer;
