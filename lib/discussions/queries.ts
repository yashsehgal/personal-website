import "server-only";

import {
  isDiscussionId,
  type DiscussionContent,
  type DiscussionMessage,
  type DiscussionSummary,
  type DiscussionThread,
} from "@/lib/discussions/content";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type DiscussionRow = {
  id: string;
  title: string;
  created_at: string;
  discussion_messages?: { count: number }[] | null;
};

type MessageRow = {
  id: string;
  discussion_id: string;
  body: DiscussionContent;
  created_at: string;
};

function mapSummary(row: DiscussionRow): DiscussionSummary {
  return {
    id: row.id,
    title: row.title,
    createdAt: row.created_at,
    replyCount: row.discussion_messages?.[0]?.count ?? 0,
  };
}

function mapMessage(row: MessageRow): DiscussionMessage {
  return {
    id: row.id,
    discussionId: row.discussion_id,
    body: row.body,
    createdAt: row.created_at,
  };
}

export async function listDiscussions(): Promise<DiscussionSummary[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("discussions")
    .select("id, title, created_at, discussion_messages(count)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load discussions.");
  }

  return (data as DiscussionRow[] | null)?.map(mapSummary) ?? [];
}

export async function getDiscussionThread(
  id: string,
): Promise<DiscussionThread | null> {
  if (!isDiscussionId(id)) {
    return null;
  }

  const supabase = getSupabaseServerClient();
  const { data: discussion, error: discussionError } = await supabase
    .from("discussions")
    .select("id, title, created_at")
    .eq("id", id)
    .maybeSingle();

  if (discussionError) {
    throw new Error("Unable to load discussion.");
  }

  if (!discussion) {
    return null;
  }

  const { data: messages, error: messagesError } = await supabase
    .from("discussion_messages")
    .select("id, discussion_id, body, created_at")
    .eq("discussion_id", id)
    .order("created_at", { ascending: true });

  if (messagesError) {
    throw new Error("Unable to load replies.");
  }

  return {
    id: discussion.id,
    title: discussion.title,
    createdAt: discussion.created_at,
    messages: ((messages as MessageRow[] | null) ?? []).map(mapMessage),
  };
}
