export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  FEED: "/feed",
  WRITINGS: "/writings",
  NOW: "/now",
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
