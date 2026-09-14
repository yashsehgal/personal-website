export const ROUTES = {
  HOME: "/",
  WRITINGS: "/writings",
  WORK: "/work",
  ABOUT: "/about",
  APPS: "/apps",
  ARCHIVE: "/archive",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
export type RouteKey = keyof typeof ROUTES;
