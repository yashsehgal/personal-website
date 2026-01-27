export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  POSTS: '/posts',
  ART: '/art',
  INTERNAL_POST_HERO_SECTION_COMPONENT_STRUCTURE:
    '/posts/hero-section-component-structure',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
