'use client';
import { CommentPinAreaProps, Comment, COMMENT_MODE } from './types';
import { ChangeEvent, KeyboardEvent, MouseEvent, useContext } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CommentPinAreaContext } from './comment-pin-area-context';
import { IconArrowRight } from '@tabler/icons-react';
import { cn } from '@/helpers';

const TEST_USER: string = 'yashsehgal' as const;

export function CommentPinArea({ allowComment }: CommentPinAreaProps) {
  const { comments, handleCanvasClick } = useContext(CommentPinAreaContext);

  const manageHandleCanvasClick = (e: MouseEvent<HTMLDivElement>) => {
    if (allowComment) {
      handleCanvasClick(e);
    }
  };

  return (
    <section
      className={cn(
        'w-full h-full overflow-hidden',
        allowComment && 'comment-accessible-section',
      )}>
      {/* Treating this div as a canvas element here */}
      <div
        className={cn(
          'relative w-full h-full',
          allowComment && 'comment-pinable-canvas',
        )}
        onClick={manageHandleCanvasClick}>
        {comments.map((comment) => {
          return <CommentItem key={comment.id} {...comment} />;
        })}
      </div>
    </section>
  );
}

function CommentItem(comment: Comment) {
  const {
    activeComment,
    handleCommentResolve,
    newCommentInput,
    setNewCommentInput,
    handleCommentSubmit,
    setActiveComment,
  } = useContext(CommentPinAreaContext);

  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape' && !newCommentInput.trim()) {
      handleCommentResolve(comment.id);
    }
  };

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentInput(e.target.value as string);
  };

  const autoResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    handleNewCommentChange(event);
  };

  const handleMarkAsResolved = () => {
    handleCommentResolve(comment.id);
  };

  return (
    <motion.div
      className="absolute flex items-start gap-2 cursor-auto w-fit h-fit"
      style={{
        left: comment.x - 12,
        top: comment.y - 12,
      }}>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setActiveComment(comment.id);
        }}
        initial={{
          opacity: 0,
          scale: 0.2,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className={cn(
          'w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center p-1 z-10',
          comment.content.trim() &&
            comment.mode === COMMENT_MODE.IDLE &&
            'hover:bg-gray-300',
        )}>
        <Image
          src={`https://github.com/${TEST_USER}.png`}
          alt={TEST_USER}
          width={60}
          height={60}
          className="w-full h-full rounded-full"
        />
      </motion.button>
      {activeComment === comment.id && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'tween', duration: 0.2 }}
          className={cn(
            'w-[240px] rounded-xl bg-gradient-to-b from-black to-neutral-800 shadow-2xl relative z-20',
            comment.mode === COMMENT_MODE.EDIT && 'mt-1',
          )}>
          {comment.mode === COMMENT_MODE.EDIT ? (
            <textarea
              value={newCommentInput}
              onChange={autoResize}
              onKeyDown={handleTextareaKeyDown}
              autoFocus
              className="hide-scroll resize-none p-3 min-h-[40px] max-h-[120px] bg-transparent font-sans leading-snug text-xs focus:outline-none text-white selection:bg-pink-500 selection:text-white w-full"
              placeholder="Drop a comment..."
            />
          ) : (
            <>
              <p className="text-xs text-white selection:bg-pink-500 selection:text-white font-sans p-2 mb-10">
                {comment.content}
              </p>
              <button
                className="text-neutral-400 text-xs font-sans font-medium absolute bottom-2 right-2 bg-white/10 py-1 px-2 rounded-md hover:bg-white/15 active:bg-white/20"
                onClick={handleMarkAsResolved}>
                Mark as resolved
              </button>
            </>
          )}
          {newCommentInput && (
            <div className="py-1.5 px-2 border-t border-white/10 flex items-center justify-end">
              <motion.button
                className="p-1 rounded-full bg-blue-500 text-white"
                onClick={() => handleCommentSubmit(comment.id)}>
                <IconArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
