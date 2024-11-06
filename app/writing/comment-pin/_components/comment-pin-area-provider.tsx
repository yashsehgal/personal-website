'use client';

import { MouseEvent, ReactNode, useState } from 'react';
import { MousePosition, Comment, COMMENT_MODE } from './types';
import {
  CommentPinAreaContext,
  CommentPinAreaContextType,
  INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA,
} from './comment-pin-area-context';

export function CommentPinAreaProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>(
    INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA.comments,
  );
  const [activeComment, setActiveComment] = useState<string>(
    INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA.activeComment,
  );
  const [mousePosition, setMousePosition] = useState<MousePosition>(
    INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA.mousePosition,
  );
  const [newCommentInput, setNewCommentInput] = useState<string>(
    INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA.newCommentInput,
  );

  const handleCanvasClick = (e: MouseEvent<HTMLDivElement>) => {
    if (activeComment) {
      // If the active comment is empty, remove it
      const activeCommentData = comments.find(
        (comment) => comment.id === activeComment,
      );
      if (activeCommentData?.content.trim() === '') {
        setComments(comments.filter((comment) => comment.id !== activeComment));
      }
      setNewCommentInput('');
      setActiveComment(null as unknown as string);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    const newComment: Comment = {
      id: Date.now().toString(),
      x,
      y,
      content: '',
      mode: COMMENT_MODE.EDIT,
    };

    // Updating comments list
    setComments([...comments, newComment]);
    setActiveComment(newComment.id);
  };

  const handleCommentSubmit = (id: string) => {
    if (newCommentInput.trim()) {
      setComments(
        comments.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: newCommentInput as string,
                mode: COMMENT_MODE.IDLE,
              }
            : comment;
        }),
      );
      setNewCommentInput('' as string);
      setActiveComment(null as unknown as string);
    } else {
      setComments(comments.filter((comment) => comment.id !== id));
      setActiveComment(null as unknown as string);
    }
  };

  const handleCommentResolve = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    setActiveComment(null as unknown as string);
  };

  const PROVIDER_DATA: CommentPinAreaContextType = {
    comments,
    setComments,
    activeComment,
    setActiveComment,
    mousePosition,
    setMousePosition,
    newCommentInput,
    setNewCommentInput,
    handleCanvasClick,
    handleCommentResolve,
    handleCommentSubmit,
  };

  return (
    <CommentPinAreaContext.Provider value={PROVIDER_DATA}>
      {children}
    </CommentPinAreaContext.Provider>
  );
}
