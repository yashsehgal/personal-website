"use client";

import { NUQS_FEED_MESSAGE_THREAD } from "@/features/personal-feed/nuqs";
import { isActiveThreadMessageId } from "@/features/personal-feed/utils/feed-message-thread-query";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useManageFeedMessageThreadQueryState() {
  const [threadMessageId, setThreadMessageId] = useQueryState(
    NUQS_FEED_MESSAGE_THREAD,
    { defaultValue: "" },
  );

  const openThread = useCallback(
    (messageId: string): void => {
      setThreadMessageId(messageId);
    },
    [setThreadMessageId],
  );

  const closeThread = useCallback((): void => {
    setThreadMessageId("");
  }, [setThreadMessageId]);

  const isThreadForMessage = useCallback(
    (messageId: string): boolean => {
      return threadMessageId === messageId;
    },
    [threadMessageId],
  );

  const isActiveThread = useMemo((): boolean => {
    return isActiveThreadMessageId(threadMessageId);
  }, [threadMessageId]);

  return {
    activeThreadMessageId: threadMessageId,
    openThread,
    closeThread,
    isThreadForMessage,
    isActiveThread,
  };
}
