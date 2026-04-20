export const feedKeys = {
  all: ["feeds"] as const,
  list: () => [...feedKeys.all, "list"] as const,
  detail: (id: string) => [...feedKeys.all, "detail", id] as const,
  byName: (name: string) => [...feedKeys.all, "name", name] as const,
};

export const feedMessageKeys = {
  all: ["feed-messages"] as const,
  forFeed: (feedId: string) => [...feedMessageKeys.all, feedId] as const,
  /** Replies under a parent message (includes feedId for prefix invalidation). */
  thread: (feedId: string, parentMessageId: string) =>
    [...feedMessageKeys.all, "thread", feedId, parentMessageId] as const,
  detail: (messageId: string) =>
    [...feedMessageKeys.all, "detail", messageId] as const,
};

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  sessionWithProfile: () => [...authKeys.all, "session-with-profile"] as const,
};

export const profileKeys = {
  all: ["profiles"] as const,
  detail: (userId: string) => [...profileKeys.all, "detail", userId] as const,
  byUserIds: (userIds: string[]) =>
    [...profileKeys.all, "by-user-ids", [...userIds].sort().join(",")] as const,
};
