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
  user_id: string;
}

export interface ICreateFeedInput {
  name: string;
  is_public: boolean;
}
