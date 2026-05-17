"use client";

import {
  NUQS_FEED_MESSAGE_THREAD,
  NUQS_FEED_SESSION,
  NUQS_SERVER_SESSION,
} from "@/features/personal-feed/nuqs";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useManageServerQueryState() {
  const [serverSession, setServerSession] = useQueryState(NUQS_SERVER_SESSION, {
    defaultValue: "",
  });

  const [, setThreadMessageId] = useQueryState(NUQS_FEED_MESSAGE_THREAD, {
    defaultValue: "",
  });

  const [, setFeedSession] = useQueryState(NUQS_FEED_SESSION, {
    defaultValue: "",
  });

  const openServerSession = useCallback(
    (serverId: string): void => {
      setServerSession(serverId);
      // Resetting active feed and thread session IDs from the query state
      setThreadMessageId("");
      setFeedSession("");
    },
    [setFeedSession, setThreadMessageId, setServerSession],
  );

  const closeServerSession = useCallback((): void => {
    setServerSession("");
    // Resetting active feed and thread session IDs from the query state
    setThreadMessageId("");
    setFeedSession("");
  }, [setFeedSession, setThreadMessageId, setServerSession]);

  const checkIfServerSessionActive = useCallback(
    (serverId: string): boolean => {
      return serverId === serverSession;
    },
    [serverSession],
  );

  const isAnyServerSessionActive = useMemo((): boolean => {
    return Boolean(serverSession);
  }, [serverSession]);

  return {
    serverSession,
    openServerSession,
    closeServerSession,
    checkIfServerSessionActive,
    isAnyServerSessionActive,
  };
}
