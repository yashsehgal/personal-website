export const feedKeys = {
  all: ["feeds"] as const,
  list: () => [...feedKeys.all, "list"] as const,
  detail: (id: string) => [...feedKeys.all, "detail", id] as const,
  byName: (name: string) => [...feedKeys.all, "name", name] as const,
};

export const feedMessageKeys = {
  all: ["feed-messages"] as const,
  forFeed: (feedId: string) => [...feedMessageKeys.all, feedId] as const,
};

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  sessionWithProfile: () => [...authKeys.all, "session-with-profile"] as const,
};
