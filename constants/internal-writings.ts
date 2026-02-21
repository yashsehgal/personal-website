import { ApplicationRoute, ROUTES } from '@/common/route';

export const INTERNAL_WRITINGS: { route: ApplicationRoute; title: string }[] = [
  {
    route: ROUTES.INTERNAL_WRITING_EXECUTION_BASED_OPTIMIZATION,
    title: 'Execution-based optimization',
  },
  {
    route: ROUTES.INTERNAL_WRITING_USING_AI_TO_WRITE_CODE_AS_A_DESIGN_ENGINEER,
    title: 'Using AI to write code as a design engineer',
  },
] as const;

export const getInternalWritingData = (pathname: ApplicationRoute) => {
  return INTERNAL_WRITINGS.find((writing) => writing.route === pathname);
};
