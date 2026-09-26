export const WEBSITE_ROUTES = {
  HOME: "/",
  WRITINGS: "/writings",
  WRITING_OPTICAL_SPACING: "/writings/optical-spacing",
  WRITING_NAVIGATION_QUERY_STATES: "/writings/navigation-using-query-states",
  WRITING_THOUGHTS_ABOUT_BUILDING_TASTE:
    "/writings/thoughts-about-building-taste",
  APPS_MUSIC: "/apps/music",
  APPS_GALLERY: "/apps/gallery",
  ARCHIVE: "/archive",
} as const;

export type WebsiteRouteType =
  (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES];
