import { GlobalContextType } from '@/context/global-context';

export const GlobalContextSetupData: GlobalContextType = {
  discussionCount: 0,
  setDiscussionCount: () => {
    throw new Error(
      '[setDiscussionCount]: Error while setting up GlobalContextSetupData',
    );
  },
} as const;
