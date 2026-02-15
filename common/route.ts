export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  POSTS: '/posts',
  ART: '/art',
  INTERNAL_POST_OPTICAL_SPACING: '/posts/optical-spacing',
  INTERNAL_POST_BREADCRUMB_COMPONENT: '/posts/navigation-using-query-states',
  INTERNAL_POST_LOGS: '/posts/logs-metadata-card',
  INTERNAL_POST_USER_AVATAR_MICRO_INTERACTION_WIDGET:
    '/posts/user-avatar-micro-interaction-widget',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
