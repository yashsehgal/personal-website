'use client';
import { GlobalContextSetupData } from '@/constants/global-context';
import { createContext, SetStateAction } from 'react';

export type GlobalContextType = {
  discussionCount: number;
  setDiscussionCount: React.Dispatch<SetStateAction<number>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  ...GlobalContextSetupData,
});
