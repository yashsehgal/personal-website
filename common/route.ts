export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  POSTS: '/posts',
  ART: '/art',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
