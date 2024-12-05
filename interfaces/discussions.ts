export interface SupabaseDiscussionInterface {
  id: number;
  created_at: string;
  title: string;
}

export interface SupabaseMessageInterface {
  id: number;
  discussion_id: number;
  created_at: string;
  content: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}
