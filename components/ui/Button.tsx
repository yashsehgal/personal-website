import { ButtonProps } from "@/types/component-types/button-types";

export const OutlineButton: React.FunctionComponent<ButtonProps> = ({ children, icon, ...buttonHTMLAttributes }) => {
    return (
        <button className={`px-4 py-2 flex flex-row items-center justify-center gap-1 rounded-md border hover:bg-zinc-50 ${buttonHTMLAttributes?.className}`} 
            {...buttonHTMLAttributes}
        >
            {children}
            {icon}
        </button>
    )
};

export const SolidButton: React.FunctionComponent<ButtonProps> = ({ children, icon, ...buttonHTMLAttributes }) => {
    return (
        <button className={`px-4 py-2 flex flex-row items-center justify-center gap-1 transition-all rounded-md border border-transparent text-white bg-zinc-900 ${buttonHTMLAttributes?.className}`}
            {...buttonHTMLAttributes}
        >
            {children}
            {icon}
        </button>
    )
};

export const ComicButton: React.FunctionComponent<ButtonProps> = ({ children, className, icon, ...buttonHTMLAttributes }) => {
    return (
        <button className={`comic-button cursor-button px-4 py-2 flex flex-row items-center justify-center gap-1 transition-all 
                            rounded-xl border-2 border-zinc-700 bg-violet-500 text-white hover:border-black hover:scale-105
                            ${className}`}
            {...buttonHTMLAttributes}
        >
            {children}
            {icon}
        </button>
    )
};

export const HireMeButton: React.FunctionComponent<ButtonProps> = ({ children, icon, ...hireMeButtonHTMLAttributes }) => {
    return (
        <ComicButton {...hireMeButtonHTMLAttributes}>
            {"Hire Me"}
        </ComicButton>
    )
};