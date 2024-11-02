'use client';
import { ReactNode, useState } from 'react';
import {
  DynamicIslandContext,
  DynamicIslandContextType,
  INITIAL_DYNAMIC_ISLAND_CONTEXT_DATA,
} from './dynamic-island-context';
import { DYNAMIC_ISLAND_STATE } from './types';

export function DynamicIslandProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DYNAMIC_ISLAND_STATE>(
    INITIAL_DYNAMIC_ISLAND_CONTEXT_DATA.state,
  );

  const PROVIDER_VALUE: DynamicIslandContextType = {
    state,
    setState,
  };

  return (
    <DynamicIslandContext.Provider value={PROVIDER_VALUE}>
      {children}
    </DynamicIslandContext.Provider>
  );
}
