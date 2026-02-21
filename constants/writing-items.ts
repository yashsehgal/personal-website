import { ApplicationRoute, ROUTES } from '@/common/route';

export interface WritingItem {
  title: string;
  path: ApplicationRoute;
  year: number;
  draftMode: boolean;
}

export const WRITING_ITEMS: WritingItem[] = [
  {
    title: 'Working patterns to follow as a design engineer',
    path: ROUTES.INTERNAL_WRITING_USING_AI_TO_WRITE_CODE_AS_A_DESIGN_ENGINEER,
    year: 2026,
    draftMode: false,
  },
  // {
  //   title: 'Execution-based optimization',
  //   path: ROUTES.INTERNAL_WRITING_EXECUTION_BASED_OPTIMIZATION,
  //   year: 2026,
  //   draftMode: true,
  // },
] as const;
