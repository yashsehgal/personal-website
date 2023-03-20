import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {};

const Button: React.FunctionComponent<ButtonProps> = ({ className, ...attr }) => {
    return (
        <button className={cn("px-3 py-1.5 bg-zinc-800 text-zinc-50 rounded hover:brightness-150 active:brightness-125", className)} {...attr}>
            {attr?.children}
        </button>
    )
};

export default Button;