export const WEBSITE_ROUTES = {
  HOME: "/",
  WRITINGS: "/writings",
  PHOTOGRAPHY: "/photography",
  ARCHIVE: "/archive",
} as const;

export type WebsiteRouteType =
  (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES];
