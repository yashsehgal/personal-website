'use client';

import { CommentPinArea } from '@/app/posts/figma-like-comment-pin-component/components/comment-pin';
import { CommentPinAreaProvider } from '@/app/posts/figma-like-comment-pin-component/components/comment-pin-area-provider';
import { useState } from 'react';

export default function PostFigmaLikeCommentPinComponentPage() {
  const [allowComment, setAllowComment] = useState<boolean>(true);

  const toggleAllowComment = () => {
    setAllowComment((allow) => !allow);
  };

  return (
    <CommentPinAreaProvider>
      <div className="p-6 space-y-8 h-full flex items-center justify-center">
        <div className="h-[420px] border w-3xl border-neutral-200 rounded-3xl relative overflow-hidden">
          <CommentPinArea allowComment={allowComment} />
          <div className="bottom-0 w-full absolute p-4">
            <button
              onClick={toggleAllowComment}
              className="px-3 py-1 text-sm border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-100">
              comment mode: {allowComment ? 'on' : 'off'}
            </button>
          </div>
        </div>
      </div>
    </CommentPinAreaProvider>
  );
}
