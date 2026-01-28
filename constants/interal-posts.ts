import { ApplicationRoute, ROUTES } from '@/common/route';

export const INTERNAL_POSTS: { route: ApplicationRoute; title: string }[] = [
  {
    route: ROUTES.INTERNAL_POST_SPACING_AND_OPTICAL_ALIGNMENT,
    title: 'Spacing and optical alignment',
  },
] as const;

export const getInternalPostData = (pathname: ApplicationRoute) => {
  return INTERNAL_POSTS.find((post) => post.route === pathname);
};
