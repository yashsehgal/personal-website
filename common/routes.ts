export const ROUTES = {
  HOME: "/",
  WRITINGS: "/writings",
  WORK: "/work",
  WORK_EXPERIENCE_STACK_AI: "/work/experience-at-stack-ai",
  ABOUT: "/about",
  PHOTOS: "/photos",
  ARCHIVE: "/archive",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
export type RouteKey = keyof typeof ROUTES;
