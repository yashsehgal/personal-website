export enum DYNAMIC_ISLAND_STATE {
  IDLE = 'IDLE',
  SUGGESTIVE = 'SUGGESTIVE',
  EXPANDED = 'EXPANDED',
}

export interface DynamicIslandProps
  extends React.HTMLAttributes<HTMLDivElement> {
  suggestions?: string[];
}
