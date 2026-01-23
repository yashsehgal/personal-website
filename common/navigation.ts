import { ApplicationRoute, ROUTES } from '@/common/routes';

export const NAVIGATION: { title: string; route: ApplicationRoute }[] = [
  { title: 'Home', route: ROUTES.HOME },
  { title: 'Work', route: ROUTES.WORK },
  { title: 'Posts', route: ROUTES.POSTS },
] as const;

export const getRouteTitle = (route: ApplicationRoute): string => {
  const routeWithInitialSlash: string = '/' + route;
  switch (routeWithInitialSlash) {
    case ROUTES.HOME:
      return 'Home';
    case ROUTES.WORK:
      return 'Work';
    case ROUTES.POSTS:
      return 'Posts';
    default:
      return '';
  }
};
