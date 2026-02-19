import { ApplicationRoute } from '@/common/route';

export interface WritingItem {
  title: string;
  path: ApplicationRoute;
  year: number;
}

export const WRITING_ITEMS: WritingItem[] = [
  //   {
  //     title: 'Execution-based optimization',
  //     path: ROUTES.INTERNAL_WRITING_EXECUTION_BASED_OPTIMIZATION,
  //     year: 2026,
  //   },
] as const;
