export interface IFeed {
  id: string;
  created_at: string;
  name: string;
  is_public: boolean;
  created_by_user_id: string | null;
}

export interface IFeedMessage {
  id: string;
  created_at: string;
  feed_id: string;
  content: string;
  /** Present when posted signed-in; null for anonymous posts. */
  user_id: string | null;
  /** Parent message id for replies; null for top-level channel messages. */
  reply_to_message_id: string | null;
}

export interface ICreateFeedInput {
  name: string;
  is_public: boolean;
}

export interface ICreateFeedMessageInput {
  feed_id: string;
  content: string;
  /** When set, message is a reply in the same feed as the parent. */
  reply_to_message_id?: string | null;
}

export interface IUpdateFeedMessageInput {
  content: string;
}
