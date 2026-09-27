"use client";

import {
  createDiscussionAction,
  createDiscussionMessageAction,
  getDiscussionThreadAction,
  listDiscussionsAction,
} from "@/lib/discussions/actions";
import {
  DISCUSSION_MESSAGES_POLL_MS,
  type DiscussionContent,
  type DiscussionMessage,
  type DiscussionSummary,
  type DiscussionThread,
} from "@/lib/discussions/content";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export class DiscussionNotFoundError extends Error {
  constructor() {
    super("Discussion not found.");
    this.name = "DiscussionNotFoundError";
  }
}

export type DiscussionMessageState = DiscussionMessage & {
  pending?: boolean;
};

export type DiscussionThreadState = Omit<DiscussionThread, "messages"> & {
  messages: DiscussionMessageState[];
};

export const discussionKeys = {
  all: ["discussions"] as const,
  list: () => [...discussionKeys.all, "list"] as const,
  thread: (id: string) => [...discussionKeys.all, "thread", id] as const,
};

export function useDiscussions() {
  return useQuery({
    queryKey: discussionKeys.list(),
    queryFn: async () => {
      const result = await listDiscussionsAction();

      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.data;
    },
  });
}

export function useDiscussionThread(id: string) {
  return useQuery({
    queryKey: discussionKeys.thread(id),
    queryFn: async (): Promise<DiscussionThreadState> => {
      const result = await getDiscussionThreadAction(id);

      if (!result.ok) {
        throw new Error(result.error);
      }

      if (!result.data) {
        throw new DiscussionNotFoundError();
      }

      return result.data;
    },
    refetchOnWindowFocus: true,
    refetchInterval: (query) => {
      if (
        typeof document === "undefined" ||
        document.visibilityState === "hidden"
      ) {
        return false;
      }

      const hasPendingMessage = query.state.data?.messages.some(
        (message) => message.pending,
      );

      if (hasPendingMessage) {
        return false;
      }

      return DISCUSSION_MESSAGES_POLL_MS;
    },
    retry: (failureCount, error) => {
      if (error instanceof DiscussionNotFoundError) {
        return false;
      }

      return failureCount < 1;
    },
  });
}

export function useCreateDiscussion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const result = await createDiscussionAction(title);

      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: discussionKeys.list() });
    },
    onSuccess: (discussion) => {
      const list = queryClient.getQueryData<DiscussionSummary[]>(
        discussionKeys.list(),
      );

      if (list) {
        queryClient.setQueryData<DiscussionSummary[]>(discussionKeys.list(), [
          discussion,
          ...list.filter((item) => item.id !== discussion.id),
        ]);
      } else {
        void queryClient.invalidateQueries({ queryKey: discussionKeys.list() });
      }

      queryClient.setQueryData<DiscussionThreadState>(
        discussionKeys.thread(discussion.id),
        {
          id: discussion.id,
          title: discussion.title,
          createdAt: discussion.createdAt,
          messages: [],
        },
      );
    },
  });
}

export function useSendDiscussionMessage(discussionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: DiscussionContent) => {
      const result = await createDiscussionMessageAction(discussionId, body);

      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onMutate: async (body) => {
      await queryClient.cancelQueries({
        queryKey: discussionKeys.thread(discussionId),
      });

      const optimistic: DiscussionMessageState = {
        id: crypto.randomUUID(),
        discussionId,
        body,
        createdAt: new Date().toISOString(),
        pending: true,
      };

      queryClient.setQueryData<DiscussionThreadState>(
        discussionKeys.thread(discussionId),
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            messages: [...current.messages, optimistic],
          };
        },
      );

      return { optimisticId: optimistic.id };
    },
    onError: (_error, _body, context) => {
      if (!context) {
        return;
      }

      queryClient.setQueryData<DiscussionThreadState>(
        discussionKeys.thread(discussionId),
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            messages: current.messages.filter(
              (message) => message.id !== context.optimisticId,
            ),
          };
        },
      );
    },
    onSuccess: (message, _body, context) => {
      queryClient.setQueryData<DiscussionThreadState>(
        discussionKeys.thread(discussionId),
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            messages: current.messages.map((item) =>
              item.id === context?.optimisticId ? message : item,
            ),
          };
        },
      );

      queryClient.setQueryData<DiscussionSummary[]>(
        discussionKeys.list(),
        (current) => {
          if (!current) {
            return current;
          }

          return current.map((discussion) =>
            discussion.id === discussionId
              ? { ...discussion, replyCount: discussion.replyCount + 1 }
              : discussion,
          );
        },
      );
    },
  });
}
