import { WrapperType } from "@/types/layouts";
import { cn } from "@/utils/cn";

const Wrapper: React.FunctionComponent<WrapperType> = ({ className, children, ...props }) => {
  return (
    <div className={cn("wrapper", className)} {...props}>
      {children}
    </div>
  )
};

export default Wrapper;