import { ApplicationRoute, ROUTES } from '@/common/route';

export const INTERNAL_POSTS: { route: ApplicationRoute; title: string }[] = [
  {
    route: ROUTES.INTERNAL_POST_OPTICAL_SPACING,
    title: 'Optical spacing',
  },
] as const;

export const getInternalPostData = (pathname: ApplicationRoute) => {
  return INTERNAL_POSTS.find((post) => post.route === pathname);
};
