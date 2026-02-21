import { ApplicationRoute, ROUTES } from '@/common/route';

export const INTERNAL_WRITINGS: { route: ApplicationRoute; title: string }[] = [
  {
    route: ROUTES.INTERNAL_WRITING_EXECUTION_BASED_OPTIMIZATION,
    title: 'Execution-based optimization',
  },
  {
    route: ROUTES.INTERNAL_WRITING_USING_AI_TO_WRITE_CODE_AS_A_DESIGN_ENGINEER,
    title: 'Working patterns to follow as a design engineer',
  },
  {
    route:
      ROUTES.INTERNAL_WRITING_PAPER_PATTERN_IN_LINEAR_SYSTEMS__CONSTANT_RATIO_OF_SUMS_OF_NUMERATORS_AND_DENOMINATORS,
    title:
      'Pattern in linear systems: constant ratio of sums of numerators and denominators',
  },
] as const;

export const getInternalWritingData = (pathname: ApplicationRoute) => {
  return INTERNAL_WRITINGS.find((writing) => writing.route === pathname);
};
