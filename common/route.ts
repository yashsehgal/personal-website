export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  POSTS: '/posts',
  ART: '/art',
  INTERNAL_POST_SPACING_AND_OPTICAL_ALIGNMENT:
    '/posts/spacing-and-optical-alignment',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
