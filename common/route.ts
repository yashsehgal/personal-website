export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  ARTICLES: '/articles',
  ART: '/art',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
