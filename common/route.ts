export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  POSTS: '/posts',
  ART: '/art',
  INTERNAL_POST_OPTICAL_SPACING: '/posts/optical-spacing',
  INTERNAL_POST_BREADCRUMB_COMPONENT: '/posts/navigation-using-query-states',
  INTERNAL_POST_LOGS: '/posts/logs-metadata-card',
  INTERNAL_POST_BUTTON_MICRO_INTERACTION: '/posts/button-micro-interaction',
  INTERNAL_POST_PHOTOGRAPHY: '/posts/photography',
  INTERNAL_WRITING_EXECUTION_BASED_OPTIMIZATION:
    '/writing/execution-based-optimization',
  INTERNAL_WRITING_USING_AI_TO_WRITE_CODE_AS_A_DESIGN_ENGINEER:
    '/writing/working-patterns-to-follow-as-a-design-engineer',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
