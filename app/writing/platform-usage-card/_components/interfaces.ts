export enum PLATFORM_USAGE_CARD_VIEW {
  SHOW_TIME = 'SHOW_TIME',
  SHOW_GRAPH = 'SHOW_GRAPH',
  SHOW_MOST_USED = 'SHOW_MOST_USED',
}

export interface IPlatformUsageCardProps {
  withAutoInterval: boolean;
  currentState?: PLATFORM_USAGE_CARD_VIEW;
}
