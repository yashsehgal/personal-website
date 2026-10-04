"use client";

import { CopyIconButton } from "@/components/copy-icon-button";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { DiscussionRichText } from "@/components/discussion-rich-text";
import { LocalDate } from "@/components/local-date";
import {
  getDiscussionPlainText,
  type DiscussionMessage,
} from "@/lib/discussions/content";
import { cn } from "cn";
import { Copy } from "lucide-react";

export function DiscussionMessageCard({
  message,
  pending = false,
}: {
  message: DiscussionMessage;
  pending?: boolean;
}) {
  return (
    <article
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-border bg-background p-3 shadow-2xs",
        pending && "opacity-70",
      )}
    >
      <div className="min-w-0">
        <DiscussionRichText content={message.body} />
        <LocalDate
          iso={message.createdAt}
          withTime
          className="mt-2 block text-xs tracking-tight text-muted-foreground tabular-nums"
        />
      </div>
      <CopyIconButton
        label="Copy reply"
        copiedLabel="Reply copied"
        icon={Copy}
        event={AnalyticsEvent.DISCUSSIONS_REPLY_COPY}
        eventProperties={{ message_id: message.id }}
        getValue={() => getDiscussionPlainText(message.body).trim()}
      />
    </article>
  );
}
