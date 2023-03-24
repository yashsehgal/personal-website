import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  ...attr
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <button
        className={cn(
          'px-3 py-1.5 bg-zinc-800 text-zinc-50 rounded hover:brightness-150 active:brightness-125',
          className,
        )}
        {...attr}>
        {attr?.children}
      </button>
    </motion.div>
  );
};

export default Button;
