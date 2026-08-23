"use client";

import { ApplicationRoute, getRouteWithParams, ROUTES } from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const ELSEWHERE_ITEMS: { label: string; route: ApplicationRoute }[] = [
  { label: "Cafes", route: ROUTES.CAFES },
  { label: "Gallery", route: ROUTES.GALLERY },
  { label: "Music", route: ROUTES.MUSIC },
  { label: "Writings", route: ROUTES.WRITINGS },
] as const;

export function HomeNavigation() {
  const router = useRouter();

  const handleElsewhereClick = (route: ApplicationRoute) => {
    router.push(getRouteWithParams(route, {}));
  };

  const handleAboutClick = () => {
    router.push(getRouteWithParams(ROUTES.ABOUT, {}));
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Elsewhere</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {ELSEWHERE_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.route}
              onClick={() => handleElsewhereClick(item.route)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" onClick={handleAboutClick}>
        About
      </Button>
    </div>
  );
}
