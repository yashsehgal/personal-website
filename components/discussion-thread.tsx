"use client";

import { DiscussionComposer } from "@/components/discussion-composer";
import { DiscussionMessageCard } from "@/components/discussion-message-card";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  createDiscussionMessageAction,
  listDiscussionMessagesAction,
} from "@/lib/discussions/actions";
import {
  DISCUSSION_MESSAGES_POLL_MS,
  getDiscussionPlainText,
  sanitizeDiscussionBody,
  type DiscussionMessage,
} from "@/lib/discussions/content";
import type { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";

function reconcileMessages(
  current: Array<DiscussionMessage & { pending?: boolean }>,
  incoming: DiscussionMessage[],
) {
  const confirmedIds = new Set(
    current.filter((message) => !message.pending).map((message) => message.id),
  );
  const pending = current.filter((message) => message.pending);
  const claimedPending = new Set<string>();

  incoming.forEach((message) => {
    if (confirmedIds.has(message.id)) {
      return;
    }

    const match = pending.find((item) => {
      if (claimedPending.has(item.id)) {
        return false;
      }

      return (
        getDiscussionPlainText(item.body).trim() ===
        getDiscussionPlainText(message.body).trim()
      );
    });

    if (match) {
      claimedPending.add(match.id);
    }
  });

  const leftoverPending = pending.filter(
    (message) =>
      !claimedPending.has(message.id) &&
      !incoming.some((item) => item.id === message.id),
  );

  return [...incoming, ...leftoverPending];
}

export function DiscussionThread({
  discussionId,
  initialMessages,
}: {
  discussionId: string;
  initialMessages: DiscussionMessage[];
}) {
  const [messages, setMessages] = useState<
    Array<DiscussionMessage & { pending?: boolean }>
  >(initialMessages);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      if (document.visibilityState === "hidden") {
        return;
      }

      const result = await listDiscussionMessagesAction(discussionId);

      if (cancelled || !result.ok) {
        return;
      }

      setMessages((current) => reconcileMessages(current, result.data));
    };

    const interval = window.setInterval(() => {
      void poll();
    }, DISCUSSION_MESSAGES_POLL_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void poll();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [discussionId]);

  const sendReply = async (bodyInput: JSONContent) => {
    const body = sanitizeDiscussionBody(bodyInput);

    if (!body) {
      setError("Write a reply before sending.");
      return;
    }

    const optimistic: DiscussionMessage & { pending?: boolean } = {
      id: crypto.randomUUID(),
      discussionId,
      body,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setError(null);
    setPending(true);
    setMessages((current) => [...current, optimistic]);

    const result = await createDiscussionMessageAction(discussionId, body);

    if (!result.ok) {
      setPending(false);
      setError(result.error);
      setMessages((current) =>
        current.filter((message) => message.id !== optimistic.id),
      );
      return;
    }

    setPending(false);
    setMessages((current) =>
      current.map((message) =>
        message.id === optimistic.id ? result.data : message,
      ),
    );
  };

  return (
    <TooltipProvider>
      <div className="flex w-full min-w-0 flex-col gap-6">
        {messages.length > 0 ? (
          <ol
            aria-label="Replies"
            className="flex w-full min-w-0 list-none flex-col gap-3 p-0"
          >
            {messages.map((message) => (
              <li key={message.id}>
                <DiscussionMessageCard
                  message={message}
                  pending={message.pending}
                />
              </li>
            ))}
          </ol>
        ) : null}
        <DiscussionComposer
          disabled={pending}
          error={error}
          onSubmit={(body) => {
            void sendReply(body);
          }}
        />
      </div>
    </TooltipProvider>
  );
}
