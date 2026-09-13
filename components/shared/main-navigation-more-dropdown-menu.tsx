import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "cn";
import { useState } from "react";

export function MainNavigationMoreDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={
          <button
            className={cn(
              "text-sm uppercase font-mono text-muted-foreground hover:text-orange-600 cursor-pointer",
              isOpen && "text-orange-600 cursor-default",
            )}
          >
            More
          </button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>Gallery</DropdownMenuItem>
        <DropdownMenuItem>Music</DropdownMenuItem>
        <DropdownMenuItem>Books</DropdownMenuItem>
        <DropdownMenuItem>Archives</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
