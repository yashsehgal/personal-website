import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ICreateFeedMessageInput,
  IFeedMessage,
  IUpdateFeedMessageInput,
} from "@/features/personal-feed/interfaces";
import { getFeedById } from "@/features/personal-feed/services/feed";

export const FEED_MESSAGES_DEFAULT_PAGE_SIZE = 50;

function mapMessage(row: {
  id: string;
  created_at: string;
  feed_id: string;
  content: string;
  user_id: string | null;
  reply_to_message_id: string | null;
}): IFeedMessage {
  return {
    id: row.id,
    created_at: row.created_at,
    feed_id: row.feed_id,
    content: row.content,
    user_id: row.user_id,
    reply_to_message_id: row.reply_to_message_id,
  };
}

const feedMessageSelect =
  "id, created_at, feed_id, content, user_id, reply_to_message_id" as const;

export interface IListFeedMessagesOptions {
  limit?: number;
  /** ISO timestamp — return messages strictly older than this (for pagination). */
  before?: string;
  /** Only top-level messages (no thread replies). */
  roots_only?: boolean;
  /** Only messages that are replies to this parent (thread). */
  reply_to_message_id?: string | null;
}

export async function listMessagesForFeed(
  supabase: SupabaseClient,
  feedId: string,
  options: IListFeedMessagesOptions = {},
): Promise<IFeedMessage[]> {
  const limit = options.limit ?? FEED_MESSAGES_DEFAULT_PAGE_SIZE;

  let q = supabase
    .from("feed_messages")
    .select(feedMessageSelect)
    .eq("feed_id", feedId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.reply_to_message_id !== undefined) {
    if (options.reply_to_message_id === null) {
      q = q.is("reply_to_message_id", null);
    } else {
      q = q.eq("reply_to_message_id", options.reply_to_message_id);
    }
  } else if (options.roots_only) {
    q = q.is("reply_to_message_id", null);
  }

  if (options.before) {
    q = q.lt("created_at", options.before);
  }

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map(mapMessage);
}

export async function getFeedMessageById(
  supabase: SupabaseClient,
  messageId: string,
): Promise<IFeedMessage | null> {
  const { data, error } = await supabase
    .from("feed_messages")
    .select(feedMessageSelect)
    .eq("id", messageId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapMessage(data) : null;
}

/**
 * Editing/deleting requires an authenticated session; only the original sender may mutate.
 * (RLS enforces the same; this fails fast with explicit errors.)
 */
async function assertAuthenticatedOwnerForMessageMutation(
  supabase: SupabaseClient,
  messageId: string,
  action: "edit" | "delete",
): Promise<IFeedMessage> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) {
    throw new Error(
      action === "edit"
        ? "Must be signed in to edit a message"
        : "Must be signed in to delete a message",
    );
  }

  const message = await getFeedMessageById(supabase, messageId);
  if (!message) {
    throw new Error("Message not found");
  }
  if (message.user_id == null) {
    throw new Error(
      action === "edit"
        ? "Anonymous messages cannot be edited"
        : "Anonymous messages cannot be deleted",
    );
  }
  if (message.user_id !== user.id) {
    throw new Error(
      "You can only edit or delete messages you posted while signed in",
    );
  }
  return message;
}

/**
 * Creates a message. Signed-in users post as themselves; anonymous users may post only to public feeds (`user_id` null).
 */
export async function createFeedMessage(
  supabase: SupabaseClient,
  input: ICreateFeedMessageInput,
): Promise<IFeedMessage> {
  const trimmed = input.content.trim();
  if (!trimmed) throw new Error("Message cannot be empty");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;

  let user_id: string | null = null;
  if (user) {
    user_id = user.id;
  } else {
    const feed = await getFeedById(supabase, input.feed_id);
    if (!feed) throw new Error("Feed not found");
    if (!feed.is_public) {
      throw new Error("Must be signed in to post to this feed");
    }
  }

  const row: {
    feed_id: string;
    content: string;
    user_id: string | null;
    reply_to_message_id?: string | null;
  } = {
    feed_id: input.feed_id,
    content: trimmed,
    user_id,
  };

  if (input.reply_to_message_id != null && input.reply_to_message_id !== "") {
    row.reply_to_message_id = input.reply_to_message_id;
  }

  const { data, error } = await supabase
    .from("feed_messages")
    .insert(row)
    .select(feedMessageSelect)
    .single();

  if (error) throw error;
  return mapMessage(data);
}

/** @deprecated Use createFeedMessage — kept for call sites expecting the old name. */
export async function addMessageToFeed(
  supabase: SupabaseClient,
  feedId: string,
  content: string,
): Promise<IFeedMessage> {
  return createFeedMessage(supabase, {
    feed_id: feedId,
    content,
  });
}

export async function updateFeedMessage(
  supabase: SupabaseClient,
  messageId: string,
  patch: IUpdateFeedMessageInput,
): Promise<IFeedMessage> {
  await assertAuthenticatedOwnerForMessageMutation(supabase, messageId, "edit");

  const trimmed = patch.content.trim();
  if (!trimmed) throw new Error("Message cannot be empty");

  const { data, error } = await supabase
    .from("feed_messages")
    .update({ content: trimmed })
    .eq("id", messageId)
    .select(feedMessageSelect)
    .single();

  if (error) throw error;
  return mapMessage(data);
}

export async function deleteFeedMessage(
  supabase: SupabaseClient,
  messageId: string,
): Promise<IFeedMessage> {
  const message = await assertAuthenticatedOwnerForMessageMutation(
    supabase,
    messageId,
    "delete",
  );

  const { error } = await supabase
    .from("feed_messages")
    .delete()
    .eq("id", messageId);
  if (error) throw error;
  return message;
}
