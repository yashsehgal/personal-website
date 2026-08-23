"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ELSEWHERE_ITEMS = ["Cafes", "Gallery", "Music", "Writings"] as const;

export function HomeNavigation() {
  return (
    <div className="flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Elsewhere</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {ELSEWHERE_ITEMS.map((item) => (
            <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost">About</Button>
    </div>
  );
}
