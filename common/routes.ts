export const ROUTES = {
  HOME: '/',
  WORK: '/work',
  POSTS: '/posts',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
