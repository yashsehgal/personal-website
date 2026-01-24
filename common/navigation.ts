import { ApplicationRoute, ROUTES } from '@/common/routes';

export const NAVIGATION_SEGMENT_TITLE_MAP = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.WORK]: 'Work',
  [ROUTES.POSTS]: 'Posts',
  [ROUTES.POST__AUTOMATION_FLOW_COMPONENT]: 'Automation flow component',
  [ROUTES.POST__CREATE_AN_INTEGRATION]: 'Create an integration',
  [ROUTES.POST__EDITING_SOFTWARE_TIMELINE_COMPONENT]:
    'Editing software timeline component',
  [ROUTES.POST__FIGMA_LIKE_COMMENT_PIN_COMPONENT]:
    'Figma-like comment pin component',
  [ROUTES.POST__DYNAMIC_ISLAND_COMPONENT]: 'Dynamic island component',
} as const;

export type InnerPage = { title: string; route: string; isExternal: boolean };

export const POSTS: InnerPage[] = [
  {
    title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.POST__AUTOMATION_FLOW_COMPONENT],
    route: ROUTES.POST__AUTOMATION_FLOW_COMPONENT,
    isExternal: false,
  },
  {
    title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.POST__CREATE_AN_INTEGRATION],
    route: ROUTES.POST__CREATE_AN_INTEGRATION,
    isExternal: false,
  },
  {
    title:
      NAVIGATION_SEGMENT_TITLE_MAP[
        ROUTES.POST__EDITING_SOFTWARE_TIMELINE_COMPONENT
      ],
    route: ROUTES.POST__EDITING_SOFTWARE_TIMELINE_COMPONENT,
    isExternal: false,
  },
  {
    title:
      NAVIGATION_SEGMENT_TITLE_MAP[
        ROUTES.POST__FIGMA_LIKE_COMMENT_PIN_COMPONENT
      ],
    route: ROUTES.POST__FIGMA_LIKE_COMMENT_PIN_COMPONENT,
    isExternal: false,
  },
  {
    title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.POST__DYNAMIC_ISLAND_COMPONENT],
    route: ROUTES.POST__DYNAMIC_ISLAND_COMPONENT,
    isExternal: false,
  },
  {
    title: 'Books I read in 2025',
    route: 'https://x.com/yashsehgaldev/status/2006262558446285044',
    isExternal: true,
  },
  {
    title: 'Background score: Epic, Hopeful, Dignified',
    route:
      'https://drive.google.com/drive/folders/1GUeDSncLmAMMqaSpRpss3ZAR4o9fipCh?usp=sharing',
    isExternal: true,
  },
  {
    title: 'Background score: Kingdom Introduction',
    route: 'https://x.com/yashsehgaldev/status/2013026621897523684',
    isExternal: true,
  },
] as const;

export const NAVIGATION: {
  title: string;
  route: ApplicationRoute;
  innerPages?: InnerPage[];
}[] = [
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.HOME], route: ROUTES.HOME },
  { title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.WORK], route: ROUTES.WORK },
  {
    title: NAVIGATION_SEGMENT_TITLE_MAP[ROUTES.POSTS],
    route: ROUTES.POSTS,
    innerPages: POSTS,
  },
] as const;

export const getRouteTitle = (route: string): string => {
  const pathWithSlash = route.startsWith('/') ? route : '/' + route;

  const fromMap =
    NAVIGATION_SEGMENT_TITLE_MAP[
      pathWithSlash as keyof typeof NAVIGATION_SEGMENT_TITLE_MAP
    ];
  if (fromMap) return fromMap;

  for (const { innerPages } of NAVIGATION) {
    if (!innerPages) continue;
    const inner = innerPages.find((p) => p.route === pathWithSlash);
    if (inner) return inner.title;
  }

  return '';
};
