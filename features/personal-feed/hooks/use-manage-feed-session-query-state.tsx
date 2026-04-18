"use client";
import { NUQS_FEED_SESSION } from "@/features/personal-feed/nuqs";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useManageFeedSessionQueryState() {
  const [feedSession, setFeedSession] = useQueryState(NUQS_FEED_SESSION, {
    defaultValue: "",
  });

  const openFeedSession = useCallback(
    (feedId: string): void => {
      setFeedSession(feedId);
    },
    [setFeedSession],
  );

  const closeFeedSession = useCallback((): void => {
    setFeedSession("");
  }, [setFeedSession]);

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
