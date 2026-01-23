import { ApplicationRoute, ROUTES } from '@/common/routes';

export const NAVIGATION_SEGMENT_TITLE_MAP = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.WORK]: 'Work',
  [ROUTES.POSTS]: 'Posts',
} as const;

export const NAVIGATION: { title: string; route: ApplicationRoute }[] = [
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.HOME], route: ROUTES.HOME },
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.WORK], route: ROUTES.WORK },
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.POSTS], route: ROUTES.POSTS },
] as const;

export const getRouteTitle = (route: string): string => {
  const routeWithInitialSlash: string = '/' + route;
  return (
    NAVIGATION_SEGMENT_TITLE_MAP[
      routeWithInitialSlash as keyof typeof NAVIGATION_SEGMENT_TITLE_MAP
    ] ?? ''
  );
};

export const POSTS: { title: string; route: string; isExternal: boolean }[] = [
  {
    title: 'Automation flow component',
    route: ROUTES.POST__AUTOMATION_FLOW_COMPONENT,
    isExternal: false,
  },
  {
    title: 'Create an integration',
    route: ROUTES.POST__CREATE_AN_INTEGRATION,
    isExternal: false,
  },
  {
    title: 'Editing software timeline component',
    route: ROUTES.POST__EDITING_SOFTWARE_TIMELINE_COMPONENT,
    isExternal: false,
  },
  {
    title: 'Figma-like comment pin component',
    route: ROUTES.POST__FIGMA_LIKE_COMMENT_PIN_COMPONENT,
    isExternal: false,
  },
  {
    title: 'Dynamic island component',
    route: ROUTES.POST__DYNAMIC_ISLAND_COMPONENT,
    isExternal: false,
  },
  {
    title: 'Books I read in 2025',
    route: 'https://x.com/yashsehgaldev/status/2006262558446285044',
    isExternal: true,
  },
] as const;
