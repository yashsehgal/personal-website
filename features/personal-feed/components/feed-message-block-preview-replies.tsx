"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FeedMessageBlock } from "@/features/personal-feed/components/feed-message-block";
import { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";
import { ChevronsDownUp, CornerDownRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FeedMessageBlockPreviewRepliesProps {
  replies: IFeedMessage[];
}

export function FeedMessageBlockPreviewReplies({
  replies,
}: FeedMessageBlockPreviewRepliesProps) {
  const [areAllRepliesExpanded, setAreAllRepliesExpanded] =
    useState<boolean>(false);

  const safeRepliesCount = useMemo(() => {
    return replies.length;
  }, [replies]);

  const safeHasRepliesAvatarURLs = useMemo(() => {
    return replies.some((reply) => !!reply.sender_profile?.avatar_url);
  }, [replies]);

  const handleExpandAllReplies = useCallback(() => {
    setAreAllRepliesExpanded(true);
  }, []);

  const handleCollapseAllReplies = useCallback(() => {
    setAreAllRepliesExpanded(false);
  }, []);

  if (safeRepliesCount === 0) return null;

  return (
    <div className="w-full relative">
      {areAllRepliesExpanded ? (
        <motion.p
          className="absolute -top-3 right-3 size-fit px-1.5 bg-background text-xs text-muted-foreground/50 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut" }}
        >
          {safeRepliesCount} replies
        </motion.p>
      ) : null}
      <AnimatePresence initial={false}>
        {areAllRepliesExpanded ? (
          <motion.div
            key="expanded-replies"
            className="mt-2 overflow-hidden shrink-0"
            style={{ transformOrigin: "top" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.22 }}
          >
            {replies.map((reply) => {
              return (
                <FeedMessageBlock
                  key={reply.id}
                  message={reply}
                  isMessageReply={true}
                />
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
      {areAllRepliesExpanded ? (
        <Button
          onClick={handleCollapseAllReplies}
          className="w-full h-fit py-1 rounded-md flex items-center justify-end gap-2 text-muted-foreground"
          size="xs"
          variant="ghost"
          withoutMicroInteractions
        >
          <ChevronsDownUp />
          <p className="text-xs leading-0">Collapse replies</p>
        </Button>
      ) : (
        <Button
          onClick={handleExpandAllReplies}
          className="w-full h-fit py-1 rounded-md flex items-center justify-between gap-2 text-muted-foreground group/message-block-preview-replies-button"
          size="xs"
          variant="ghost"
          withoutMicroInteractions
        >
          <div className="flex items-center justify-start gap-2">
            <CornerDownRight className="size-3" />
            {safeHasRepliesAvatarURLs ? (
              <SafeRepliesAvatarContainer replies={replies} />
            ) : null}
            <p className="text-xs leading-0">{safeRepliesCount} replies</p>
          </div>
          <p className="text-xs group-hover/message-block-preview-replies-button:visible invisible leading-0 text-muted-foreground">
            View replies
          </p>
        </Button>
      )}
    </div>
  );
}

interface SafeRepliesAvatarContainerProps {
  replies: IFeedMessage[];
}

function SafeRepliesAvatarContainer({
  replies,
}: SafeRepliesAvatarContainerProps) {
  const replyUserIds = useMemo(() => {
    return [
      ...new Set(
        replies
          .map((reply) => reply.user_id)
          .filter((userId): userId is string => !!userId),
      ),
    ];
  }, [replies]);

  const { data: replyProfiles = [] } = useProfilesByUserIds(replyUserIds);

  const safePreviewProfiles = useMemo(() => {
    if (replyProfiles.length > 0) return replyProfiles.slice(0, 3);

    // Fallback when replies include sender_profile inline but query profile rows are not ready.
    return replies
      .map((reply) => reply.sender_profile)
      .filter((profile): profile is NonNullable<typeof profile> => !!profile)
      .slice(0, 3);
  }, [replies, replyProfiles]);

  return (
    <div className="flex items-center justify-start gap-1">
      {safePreviewProfiles.map((profile) => (
        <Avatar key={profile.id} size="sm" className="size-4!">
          <AvatarImage
            src={profile.avatar_url ?? undefined}
            alt="Reply user avatar"
          />
          <AvatarFallback>
            {(
              profile.full_name?.charAt(0) ??
              profile.email?.charAt(0) ??
              "R"
            ).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
