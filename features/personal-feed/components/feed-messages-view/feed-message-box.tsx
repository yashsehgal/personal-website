"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { userToProfile } from "@/features/personal-feed/services/auth";
import { useAddFeedMessage } from "@/hooks/use-add-feed-message";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useFeed } from "@/hooks/use-feed";
import { cn } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

export function FeedMessageBox() {
  const {
    data: session,
    isError: isAuthSessionError,
    isLoading: isAuthSessionLoading,
  } = useAuthSession();

  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feed, isLoading: isFeedLoading } = useFeed(feedSession);
  const addFeedMessage = useAddFeedMessage();

  // UI STATES AND REFERENCES
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMessageBoxTextareaFocused, setIsMessageBoxTextareaFocused] =
    useState<boolean>(false);
  const [messageBoxTextareaInputValue, setMessageBoxTextareaInputValue] =
    useState<string>("");

  const safeFeedName = useMemo(() => {
    if (isFeedLoading) {
      return "";
    }

    return feed?.name ?? "Untitled Feed";
  }, [feed, isFeedLoading]);

  const profile = useMemo(() => {
    if (isAuthSessionError || !session) {
      return null;
    }

    return userToProfile(session.user);
  }, [session, isAuthSessionError]);

  const safeIsAuthenticated = useMemo(() => {
    if (isAuthSessionError) {
      return false;
    }

    return session !== null && !isAuthSessionError;
  }, [session, isAuthSessionError]);

  const safeUserDisplayName = useMemo(() => {
    if (isAuthSessionError || !profile) {
      return "";
    }

    return profile.displayName ?? profile.email ?? "User";
  }, [profile, isAuthSessionError]);

  const handleMessageBoxTextareaFocusEvent = () => {
    setIsMessageBoxTextareaFocused(true);
  };

  const handleMessageBoxTextareaBlurEvent = () => {
    setIsMessageBoxTextareaFocused(false);
  };

  const handleMessageBoxTextareaInputValueChangeEvent = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMessageBoxTextareaInputValue(event.target.value);
  };

  const safeMessageBoxTextareaInputValueHasSomeText = useMemo(() => {
    const trimmed = messageBoxTextareaInputValue.trim();
    return Boolean(trimmed);
  }, [messageBoxTextareaInputValue]);

  const canSendMessage =
    Boolean(feedSession) &&
    safeMessageBoxTextareaInputValueHasSomeText &&
    !isFeedLoading &&
    !addFeedMessage.isPending;

  const handleSendMessage = () => {
    if (!feedSession || !safeMessageBoxTextareaInputValueHasSomeText) return;
    const content = messageBoxTextareaInputValue.trim();
    addFeedMessage.mutate(
      { feed_id: feedSession, content },
      {
        onSuccess: () => {
          setMessageBoxTextareaInputValue("");
          requestAnimationFrame(() => {
            textareaRef.current?.focus({ preventScroll: true });
          });
        },
      },
    );
  };

  useEffect(() => {
    if (isFeedLoading) return;
    const el = textareaRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [isFeedLoading]);

  return (
    <div
      className={cn(
        "w-full h-fit border border-border rounded-xl divide-y divide-border transition-all bg-background",
        isMessageBoxTextareaFocused
          ? "border-primary/50 ring-4 ring-primary/20"
          : "",
      )}
    >
      <div className="w-full py-2 px-2.5 flex items-center justify-between bg-muted rounded-t-xl">
        <div />
        {isAuthSessionLoading ? (
          <Skeleton className="h-5 w-56" />
        ) : (
          <>
            {safeIsAuthenticated ? (
              <div className="flex items-center flex-row-reverse justify-start gap-2">
                <Avatar className="size-5!">
                  <AvatarImage
                    src={profile?.avatarUrl ?? undefined}
                    alt={safeUserDisplayName}
                  />
                  <AvatarFallback>
                    {safeUserDisplayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">
                  In conversation as {safeUserDisplayName}
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Your messages are going to be public and anonymous.
              </p>
            )}
          </>
        )}
      </div>
      <Textarea
        ref={textareaRef}
        value={messageBoxTextareaInputValue}
        onChange={handleMessageBoxTextareaInputValueChangeEvent}
        disabled={isFeedLoading}
        onFocus={handleMessageBoxTextareaFocusEvent}
        onBlur={handleMessageBoxTextareaBlurEvent}
        aria-busy={isFeedLoading}
        className="resize-none min-h-12 max-h-64 w-full rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent leading-6"
        placeholder={`Write a message to #${safeFeedName}`}
      />
      <div className="px-3 pb-3 flex items-center justify-between gap-2">
        <div />
        <Button
          type="button"
          className="gap-2"
          disabled={!canSendMessage}
          onClick={handleSendMessage}
        >
          {addFeedMessage.isPending ? (
            <Loader2 className="shrink-0 animate-spin" />
          ) : (
            <Send className="shrink-0" />
          )}
          Send
        </Button>
      </div>
    </div>
  );
}
