import { WEBSITE_ROUTES } from "@/common/routes";

const WRITING_ITEMS = [
  {
    id: "WRITING_OPTICAL_SPACING",
    title: "Optical spacing",
    href: WEBSITE_ROUTES.WRITING_OPTICAL_SPACING,
    year: 2026,
    type: "Layout",
  },
  {
    id: "WRITING_NAVIGATION_QUERY_STATES",
    title: "Navigation using query states",
    href: WEBSITE_ROUTES.WRITING_NAVIGATION_QUERY_STATES,
    year: 2026,
    type: "Navigation",
  },
] as const;

export const WRITINGS = [...WRITING_ITEMS].sort((a, b) => {
  if (a.year !== b.year) return b.year - a.year;
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
});
