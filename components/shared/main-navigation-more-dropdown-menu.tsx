import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "cn";
import { useState } from "react";

const MoreDropdownMenuItems: string[] = [
  "Gallery",
  "Music",
  "Books",
  "Archives",
];

export function MainNavigationMoreDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={
          <button
            className={cn(
              "text-sm uppercase font-mono text-muted-foreground hover:text-blue-600 cursor-pointer",
              isOpen && "text-blue-600 cursor-default",
            )}
          >
            More [{MoreDropdownMenuItems.length}]
          </button>
        }
      />
      <DropdownMenuContent>
        {MoreDropdownMenuItems.map((item) => (
          <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
