export const WEBSITE_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  WORK: "/work",
  WRITINGS: "/writings",
} as const;

export type WebsiteRouteType =
  (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES];
