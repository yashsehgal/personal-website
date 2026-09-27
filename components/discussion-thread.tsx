"use client";

import { DiscussionComposer } from "@/components/discussion-composer";
import { DiscussionMessageCard } from "@/components/discussion-message-card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sanitizeDiscussionBody } from "@/lib/discussions/content";
import { useDiscussionThread, useSendDiscussionMessage } from "@/lib/discussions/hooks";
import type { JSONContent } from "@tiptap/react";
import { useState } from "react";

export function DiscussionThread({ discussionId }: { discussionId: string }) {
  const thread = useDiscussionThread(discussionId);
  const sendReply = useSendDiscussionMessage(discussionId);
  const [error, setError] = useState<string | null>(null);

  const submitReply = (bodyInput: JSONContent) => {
    const body = sanitizeDiscussionBody(bodyInput);

    if (!body) {
      setError("Write a reply before sending.");
      return;
    }

    setError(null);
    sendReply.mutate(body, {
      onError: (mutationError) => {
        setError(
          mutationError instanceof Error
            ? mutationError.message
            : "Unable to send reply. Try again.",
        );
      },
    });
  };

  if (thread.isLoading) {
    return null;
  }

  if (!thread.isSuccess) {
    return null;
  }

  const messages = thread.data.messages;

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
          disabled={sendReply.isPending}
          error={error}
          onSubmit={submitReply}
        />
      </div>
    </TooltipProvider>
  );
}
