import { ApplicationRoute, ROUTES } from '@/common/route';

export const INTERNAL_WRITINGS: { route: ApplicationRoute; title: string }[] = [
  {
    route: ROUTES.INTERNAL_WRITING_EXECUTION_BASED_OPTIMIZATION,
    title: 'Execution-based optimization',
  },
] as const;

export const getInternalWritingData = (pathname: ApplicationRoute) => {
  return INTERNAL_WRITINGS.find((writing) => writing.route === pathname);
};
