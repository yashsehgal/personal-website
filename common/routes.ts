export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  WORK: "/work",
} as const;

export type RouteType = keyof typeof ROUTES;
