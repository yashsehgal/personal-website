import { ApplicationRoute, ROUTES } from '@/common/routes';

export const NAVIGATION: { title: string; route: ApplicationRoute }[] = [
  { title: 'Home', route: ROUTES.HOME },
  { title: 'Work', route: ROUTES.WORK },
  { title: 'Posts', route: ROUTES.POSTS },
] as const;
