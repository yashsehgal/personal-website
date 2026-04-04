export const ROUTES = {
  HOME: "/",
  STUDY: "/study",
  ABOUT: "/about",
  FEED: "/feed",
  WRITINGS: "/writings",
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
