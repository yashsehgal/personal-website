'use client';
import React, { createContext, MouseEvent, SetStateAction } from 'react';
import { Comment, MousePosition } from './types';

export type CommentPinAreaContextType = {
  // state values and respective setters/dispatch actions
  comments: Comment[];
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  activeComment: string;
  setActiveComment: React.Dispatch<SetStateAction<string>>;
  mousePosition: MousePosition;
  setMousePosition: React.Dispatch<SetStateAction<MousePosition>>;
  newCommentInput: string;
  setNewCommentInput: React.Dispatch<SetStateAction<string>>;

  // list of handlers for comment actions
  handleCanvasClick: (e: MouseEvent<HTMLDivElement>) => void;
  handleCommentSubmit: (id: string) => void;
  handleCommentResolve: (id: string) => void;
};

export const INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA: CommentPinAreaContextType =
  {
    comments: [],
    activeComment: null as unknown as string,
    mousePosition: { x: 0, y: 0 },
    newCommentInput: '',
    /* eslint-disable @typescript-eslint/no-unused-vars */
    setComments: function (_comment: React.SetStateAction<Comment[]>): void {
      throw new Error('Function not implemented.');
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    setActiveComment: function (_value: React.SetStateAction<string>): void {
      throw new Error('Function not implemented.');
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    setMousePosition: function (
      _position: React.SetStateAction<MousePosition>,
    ): void {
      throw new Error('Function not implemented.');
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    setNewCommentInput: function (_value: React.SetStateAction<string>): void {
      throw new Error('Function not implemented.');
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    handleCanvasClick: function (_e: MouseEvent<HTMLDivElement>): void {
      throw new Error('Function not implemented.');
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    handleCommentSubmit: function (_id: string): void {
      throw new Error('Function not implemented.');
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    handleCommentResolve: function (_id: string): void {
      throw new Error('Function not implemented.');
    },
  };

export const CommentPinAreaContext = createContext<CommentPinAreaContextType>({
  ...INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA,
});
