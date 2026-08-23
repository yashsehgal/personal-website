"use client";

import { ApplicationRoute, getRouteWithParams, ROUTES } from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Coffee,
  Music,
  Pen,
  Picture,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, HugeiconsIconProps } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ELSEWHERE_ITEMS: {
  label: string;
  route: ApplicationRoute;
  icon: HugeiconsIconProps["icon"];
}[] = [
  { label: "Cafes", route: ROUTES.CAFES, icon: Coffee },
  { label: "Gallery", route: ROUTES.GALLERY, icon: Picture },
  { label: "Music", route: ROUTES.MUSIC, icon: Music },
  { label: "Writings", route: ROUTES.WRITINGS, icon: Pen },
] as const;

export function HomeNavigation() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleElsewhereClick = (route: ApplicationRoute) => {
    router.push(getRouteWithParams(route, {}));
  };

  const handleAboutClick = () => {
    router.push(getRouteWithParams(ROUTES.ABOUT, {}));
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" onClick={handleAboutClick}>
        About
      </Button>
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            Elsewhere{" "}
            <HugeiconsIcon
              icon={ChevronDown}
              className={cn(
                "w-4 h-4 transition-transform duration-200 ease-in-out",
                open && "rotate-180",
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {ELSEWHERE_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.route}
              onClick={() => handleElsewhereClick(item.route)}
            >
              <HugeiconsIcon icon={item.icon} className="w-4 h-4 mr-0.5" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
