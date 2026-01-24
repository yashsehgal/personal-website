export const ROUTES = {
  HOME: '/',
  WORK: '/work',
  POSTS: '/posts',
  POST__AUTOMATION_FLOW_COMPONENT: '/posts/automation-flow-component',
  POST__CREATE_AN_INTEGRATION: '/posts/create-an-integration',
  POST__EDITING_SOFTWARE_TIMELINE_COMPONENT:
    '/posts/editing-software-timeline-component',
  POST__FIGMA_LIKE_COMMENT_PIN_COMPONENT:
    '/posts/figma-like-comment-pin-component',
  POST__DYNAMIC_ISLAND_COMPONENT: '/posts/dynamic-island-component',
} as const;

export type ApplicationRoute = (typeof ROUTES)[keyof typeof ROUTES];
