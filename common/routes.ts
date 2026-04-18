export const ROUTES = {
  HOME: "/",
  STUDY: "/study",
  ABOUT: "/about",
  FEED: "/feed",
  WRITINGS: "/writings",
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const getRouteWithParams = (
  route: ApplicationRoute,
  params: Record<string, string>,
) => {
  return route.replace(
    /:(\w+)/g,
    (match, p1) => params[p1 as keyof typeof params] ?? match,
  );
};
