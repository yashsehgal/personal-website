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
  INTERNAL_WRITING_PAPER_PATTERN_IN_LINEAR_SYSTEMS__CONSTANT_RATIO_OF_SUMS_OF_NUMERATORS_AND_DENOMINATORS:
    '/writing/pattern-in-linear-systems-constant-ratio-of-sums-of-numerators-and-denominators',
  INTERNAL_POST_ANIMATED_WAVE_FORMS: '/posts/animated-wave-forms',
  INTERNAL_POST_IMAGE_LOADING_WITH_TRANSITION:
    '/posts/image-loading-with-transition',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
