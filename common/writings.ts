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
  {
    id: "WRITING_THOUGHTS_ABOUT_BUILDING_TASTE",
    title: "Thoughts about building taste #1",
    href: WEBSITE_ROUTES.WRITING_THOUGHTS_ABOUT_BUILDING_TASTE,
    year: 2026,
    type: "Essay",
  },
  {
    id: "WRITING_ADDING_COMPANIES_FROM_A_SPREADSHEET",
    title: "Bulk CSV Handling",
    href: WEBSITE_ROUTES.WRITING_ADDING_COMPANIES_FROM_A_SPREADSHEET,
    year: 2026,
    type: "Engineering",
  },
] as const;

export const WRITINGS = [...WRITING_ITEMS].sort((a, b) => {
  if (a.year !== b.year) return b.year - a.year;
  return b.title.localeCompare(a.title, "en", { sensitivity: "base" });
});
