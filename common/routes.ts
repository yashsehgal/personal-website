export const WEBSITE_ROUTES = {
  HOME: "/",
  WORK: "/work",
  WRITINGS: "/writings",
  PHOTOGRAPHY: "/photography",
} as const;

export type WebsiteRouteType =
  (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES];
