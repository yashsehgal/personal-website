import { ApplicationRoute, ROUTES } from '@/common/route';

export const INTERNAL_POSTS: { route: ApplicationRoute; title: string }[] = [
  {
    route: ROUTES.INTERNAL_POST_OPTICAL_SPACING,
    title: 'Optical spacing',
  },
  {
    route: ROUTES.INTERNAL_POST_BREADCRUMB_COMPONENT,
    title: 'Dashboard navigation using query states',
  },
] as const;

export const getInternalPostData = (pathname: ApplicationRoute) => {
  return INTERNAL_POSTS.find((post) => post.route === pathname);
};
