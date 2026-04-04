"use client";

import { ApplicationRoute, ROUTES } from "@/common/routes";
import { BasicLink } from "@/components/ui/basic-link";

const NAVIGATION_HIGHLIGHTED_LINKS: {
  title: string;
  route: ApplicationRoute;
}[] = [
  // { title: "Study", route: ROUTES.STUDY },
  { title: "Writings", route: ROUTES.WRITINGS },
  { title: "About", route: ROUTES.ABOUT },
  { title: "Feed", route: ROUTES.FEED },
] as const;

export function Navigation() {
  return (
    <nav className="flex items-center justify-between py-4 px-8 border-b">
      <div className="flex items-center justify-start gap-2">
        <BasicLink href={ROUTES.HOME} withoutHighlight>
          <div className="flex items-center gap-2 text-sm">
            <p className="tracking-tight font-medium">Yash Sehgal</p>
            <p className="tracking-tight text-muted-foreground">
              Design Engineer
            </p>
          </div>
        </BasicLink>
      </div>
      <div className="flex items-center justify-end gap-4">
        {NAVIGATION_HIGHLIGHTED_LINKS.map((option, index) => {
          return (
            <BasicLink
              key={index}
              href={option.route}
              withoutHighlight
              className="text-sm font-medium"
            >
              {option.title}
            </BasicLink>
          );
        })}
      </div>
    </nav>
  );
}
