'use client';
import { GlobalContextSetupData } from '@/constants/global-context';
import { GlobalContext } from '@/context/global-context';
import { getAllDiscussions } from '@/services/discussions';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const STALE_TIME: number = 1000 * 60 * 5; // Cache for 5 minutes
const RETRY: number = 2;

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [discussionCount, setDiscussionCount] = useState<number>(
    GlobalContextSetupData.discussionCount,
  );

  const {
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['discussions'],
    queryFn: getAllDiscussions,
    staleTime: STALE_TIME,
    retry: RETRY,
  });

  useEffect(() => {
    if (!error && !isLoading && response?.discussions.length) {
      setDiscussionCount(response.discussions.length);
    }
  }, [response]);

  return (
    <GlobalContext.Provider value={{ discussionCount, setDiscussionCount }}>
      {children}
    </GlobalContext.Provider>
  );
}
