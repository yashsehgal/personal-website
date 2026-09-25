export const WEBSITE_ROUTES = {
  HOME: "/",
  WRITINGS: "/writings",
  WRITING_OPTICAL_SPACING: "/writings/optical-spacing",
  WRITING_NAVIGATION_QUERY_STATES: "/writings/navigation-using-query-states",
  PHOTOGRAPHY: "/photography",
  APPS_MUSIC: "/apps/music",
  ARCHIVE: "/archive",
} as const;

export type WebsiteRouteType =
  (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES];
