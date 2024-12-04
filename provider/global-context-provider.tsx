'use client';
import { GlobalContextSetupData } from '@/constants/global-context';
import { GlobalContext } from '@/context/global-context';
import { getAllDiscussions } from '@/services/discussions';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2,
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
