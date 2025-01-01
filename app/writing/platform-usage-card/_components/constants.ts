import { PLATFORM_USAGE_CARD_VIEW } from '@/app/writing/platform-usage-card/_components/interfaces';

export const PLATFORM_USAGE_CARD_DEMO_CONTROLLER_VALUES: Record<
  PLATFORM_USAGE_CARD_VIEW,
  string
> = {
  [PLATFORM_USAGE_CARD_VIEW.SHOW_TIME]: 'Show only time',
  [PLATFORM_USAGE_CARD_VIEW.SHOW_GRAPH]: 'Show with graph',
  [PLATFORM_USAGE_CARD_VIEW.SHOW_MOST_USED]: 'Show with most used platforms',
} as const;
