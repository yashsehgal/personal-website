import type { SupabaseClient } from "@supabase/supabase-js";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";

export const FEED_MESSAGES_DEFAULT_PAGE_SIZE = 50;

function mapMessage(row: {
  id: string;
  created_at: string;
  feed_id: string;
  content: string;
  user_id: string;
}): IFeedMessage {
  return {
    id: row.id,
    created_at: row.created_at,
    feed_id: row.feed_id,
    content: row.content,
    user_id: row.user_id,
  };
}

export interface IListFeedMessagesOptions {
  limit?: number;
  /** ISO timestamp — return messages strictly older than this (for pagination). */
  before?: string;
}

export async function listMessagesForFeed(
  supabase: SupabaseClient,
  feedId: string,
  options: IListFeedMessagesOptions = {},
): Promise<IFeedMessage[]> {
  const limit = options.limit ?? FEED_MESSAGES_DEFAULT_PAGE_SIZE;

  let q = supabase
    .from("feed_messages")
    .select("id, created_at, feed_id, content, user_id")
    .eq("feed_id", feedId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (options.before) {
    q = q.lt("created_at", options.before);
  }

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map(mapMessage);
}

export async function addMessageToFeed(
  supabase: SupabaseClient,
  feedId: string,
  content: string,
): Promise<IFeedMessage> {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Message cannot be empty");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Must be signed in to post a message");

  const { data, error } = await supabase
    .from("feed_messages")
    .insert({
      feed_id: feedId,
      content: trimmed,
      user_id: user.id,
    })
    .select("id, created_at, feed_id, content, user_id")
    .single();

  if (error) throw error;
  return mapMessage(data);
}

export async function deleteFeedMessage(
  supabase: SupabaseClient,
  messageId: string,
): Promise<void> {
  const { error } = await supabase
    .from("feed_messages")
    .delete()
    .eq("id", messageId);
  if (error) throw error;
}
