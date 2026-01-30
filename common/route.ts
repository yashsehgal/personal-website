export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  POSTS: '/posts',
  ART: '/art',
  INTERNAL_POST_OPTICAL_SPACING: '/posts/optical-spacing',
  INTERNAL_POST_BREADCRUMB_COMPONENT: '/posts/navigation-using-query-states',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
