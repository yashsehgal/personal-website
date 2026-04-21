"use client";
import {
  NUQS_FEED_MESSAGE_THREAD,
  NUQS_FEED_SESSION,
} from "@/features/personal-feed/nuqs";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useManageFeedSessionQueryState() {
  const [feedSession, setFeedSession] = useQueryState(NUQS_FEED_SESSION, {
    defaultValue: "",
  });

  const [, setThreadMessageId] = useQueryState(NUQS_FEED_MESSAGE_THREAD, {
    defaultValue: "",
  });

  const openFeedSession = useCallback(
    (feedId: string): void => {
      setFeedSession(feedId);
      setThreadMessageId("");
    },
    [setFeedSession, setThreadMessageId],
  );

  const closeFeedSession = useCallback((): void => {
    setFeedSession("");
    setThreadMessageId("");
  }, [setFeedSession, setThreadMessageId]);

  const checkIfFeedSessionIsActive = useCallback(
    (feedId: string): boolean => {
      return feedSession === feedId;
    },
    [feedSession],
  );

  const isAnyFeedSessionActive = useMemo((): boolean => {
    return Boolean(feedSession);
  }, [feedSession]);

  return {
    feedSession,
    openFeedSession,
    closeFeedSession,
    checkIfFeedSessionIsActive,
    isAnyFeedSessionActive,
  };
}
