import { ApplicationRoute, ROUTES } from '@/common/routes';

export const NAVIGATION_SEGMENT_TITLE_MAP = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.WORK]: 'Work',
  [ROUTES.POSTS]: 'Posts',
} as const;

export const NAVIGATION: { title: string; route: ApplicationRoute }[] = [
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.HOME], route: ROUTES.HOME },
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.WORK], route: ROUTES.WORK },
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.POSTS], route: ROUTES.POSTS },
] as const;

export const getRouteTitle = (route: string): string => {
  const routeWithInitialSlash: string = '/' + route;
  return (
    NAVIGATION_SEGMENT_TITLE_MAP[
      routeWithInitialSlash as keyof typeof NAVIGATION_SEGMENT_TITLE_MAP
    ] ?? ''
  );
};
