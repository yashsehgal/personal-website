export enum COMMENT_MODE {
  IDLE = 'IDLE',
  EDIT = 'EDIT',
}

export type Comment = {
  id: string;
  x: number;
  y: number;
  content: string;
  mode: COMMENT_MODE;
};

export type MousePosition = {
  x: number;
  y: number;
};

export interface CommentPinAreaProps {
  allowComment: boolean;
}
