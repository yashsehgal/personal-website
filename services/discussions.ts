import {
  SupabaseDiscussionInterface,
  SupabaseMessageInterface,
} from '@/interfaces/discussions';
import { supabase } from './supabase-client';

export async function getAllDiscussions(): Promise<{
  discussions: SupabaseDiscussionInterface[];
  error: Error | null;
}> {
  try {
    const { data, error, status } = await supabase
      .from('discussions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getAllDiscussions]: Error:', error.message);
      return { discussions: [], error: new Error(error.message) };
    }

    if (!data) {
      console.warn('[getAllDiscussions]: No data received, status:', status);
      return { discussions: [], error: null };
    }

    return { discussions: data, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Unknown error occurred');
    console.error('[getAllDiscussions]: Unexpected error:', error);
    return { discussions: [], error };
  }
}

export async function getDiscussion(discussionId: number): Promise<{
  discussion: SupabaseDiscussionInterface | null;
  error: Error | null;
}> {
  try {
    const { data, error, status } = await supabase
      .from('discussions')
      .select('*')
      .eq('id', discussionId)
      .single();

    if (error) {
      console.error('[getDiscussion]: Error:', error.message);
      return { discussion: null, error: new Error(error.message) };
    }

    if (!data) {
      console.warn('[getDiscussion]: No data received, status:', status);
      return { discussion: null, error: null };
    }

    return { discussion: data, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Unknown error occurred');
    console.error('[getDiscussion]: Unexpected error:', error);
    return { discussion: null, error };
  }
}

export async function getDiscussionContent(discussionId: number): Promise<{
  messages: SupabaseMessageInterface[];
  error: Error | null;
}> {
  try {
    const { data, error, status } = await supabase
      .from('messages')
      .select('*')
      .eq('discussion_id', discussionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[getDiscussionContent]: Error:', error.message);
      return { messages: [], error: new Error(error.message) };
    }

    if (!data) {
      console.warn('[getDiscussionContent]: No data received, status:', status);
      return { messages: [], error: null };
    }

    return { messages: data, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Unknown error occurred');
    console.error('[getDiscussionContent]: Unexpected error:', error);
    return { messages: [], error };
  }
}

interface CreateDiscussionPayload {
  title: string;
}

export async function createDiscussion(
  payload: CreateDiscussionPayload,
): Promise<{
  discussion: SupabaseDiscussionInterface | null;
  error: Error | null;
}> {
  try {
    const { data, error, status } = await supabase
      .from('discussions')
      .insert([{ title: payload.title }])
      .select()
      .single();

    if (error) {
      console.error('[createDiscussion]: Error:', error.message);
      return { discussion: null, error: new Error(error.message) };
    }

    if (!data) {
      console.warn('[createDiscussion]: No data received, status:', status);
      return { discussion: null, error: null };
    }

    return { discussion: data, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Unknown error occurred');
    console.error('[createDiscussion]: Unexpected error:', error);
    return { discussion: null, error };
  }
}

interface CreateMessagePayload {
  discussion_id: number;
  content: string;
}

export async function createMessage(payload: CreateMessagePayload): Promise<{
  message: SupabaseMessageInterface | null;
  error: Error | null;
}> {
  try {
    const { data, error, status } = await supabase
      .from('messages')
      .insert([
        {
          discussion_id: payload.discussion_id,
          content: payload.content,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[createMessage]: Error:', error.message);
      return { message: null, error: new Error(error.message) };
    }

    if (!data) {
      console.warn('[createMessage]: No data received, status:', status);
      return { message: null, error: null };
    }

    return { message: data, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Unknown error occurred');
    console.error('[createMessage]: Unexpected error:', error);
    return { message: null, error };
  }
}
