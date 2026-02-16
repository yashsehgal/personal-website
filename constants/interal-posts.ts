import { ApplicationRoute, ROUTES } from '@/common/route';

export const INTERNAL_POSTS: { route: ApplicationRoute; title: string }[] = [
  {
    route: ROUTES.INTERNAL_POST_OPTICAL_SPACING,
    title: 'Optical spacing',
  },
  {
    route: ROUTES.INTERNAL_POST_BREADCRUMB_COMPONENT,
    title: 'Navigation using query states',
  },
  {
    route: ROUTES.INTERNAL_POST_LOGS,
    title: 'Logs metadata card',
  },
  {
    route: ROUTES.INTERNAL_POST_BUTTON_MICRO_INTERACTION,
    title: 'Button micro interaction',
  },
  {
    route: ROUTES.INTERNAL_POST_PHOTOGRAPHY,
    title: 'Photography',
  },
] as const;

export const getInternalPostData = (pathname: ApplicationRoute) => {
  return INTERNAL_POSTS.find((post) => post.route === pathname);
};
