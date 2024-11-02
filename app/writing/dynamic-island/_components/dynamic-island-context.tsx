import { createContext, SetStateAction } from 'react';
import { DYNAMIC_ISLAND_STATE } from './types';

export type DynamicIslandContextType = {
  state: DYNAMIC_ISLAND_STATE;
  setState: React.Dispatch<SetStateAction<DYNAMIC_ISLAND_STATE>>;
};

export const INITIAL_DYNAMIC_ISLAND_CONTEXT_DATA: Pick<
  DynamicIslandContextType,
  'state'
> = {
  state: DYNAMIC_ISLAND_STATE.IDLE,
} as const;

export const DynamicIslandContext = createContext<DynamicIslandContextType>({
  ...INITIAL_DYNAMIC_ISLAND_CONTEXT_DATA,
  setState: () => {
    throw new Error('setState was called without a Provider');
  },
});
