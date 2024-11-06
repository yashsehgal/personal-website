'use client';
import { useState } from 'react';
import { DemoBlock, DemoBlockFooter } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { CommentPinArea } from './_components/comment-pin';
import { CommentPinAreaProvider } from './_components/comment-pin-area-provider';
import { CodeBlock } from '../_components/code-block';

export default function PostCommentPin() {
  return (
    <WritingContainer id="post__comment-pin">
      <WritingHeader>
        <WritingHeadline>Creating a figma like comment pin</WritingHeadline>
        <WritingDetails>Wednesday, 6th Nov, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <CommentPinAreaProvider>
          <MainCommentPinDemo />
        </CommentPinAreaProvider>
        <h3>Foundational concept</h3>
        <ul className="list-inside list-decimal">
          <li className="list-item">Track click positions on a canvas</li>
          <li className="list-item">Create comment pins at those positions</li>
          <li className="list-item">Handle comment states (editing/viewing)</li>
          <li className="list-item">Manage animations for a polished feel</li>
        </ul>
        <h3>Step 1: Defining Our Types</h3>
        <p>
          First, let&apos;s establish our type system. This is crucial for
          maintaining code clarity and preventing bugs:
        </p>
        <CodeBlock lang="typescript">
          {`export enum COMMENT_MODE {
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
`}
        </CodeBlock>
        <p>
          These types define our comment structure and possible states. Each
          comment has coordinates, content, and a mode (either editing or idle).
        </p>
        <h3>Step 2: Setting Up the Context</h3>
        <p>
          For state management, we&apos;ll use React Context. This makes our
          comment state accessible throughout the component tree:
        </p>
        <CodeBlock lang="typescript">{`'use client';
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

export const INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA: CommentPinAreaContextType = {
  comments: [],
  activeComment: null as unknown as string,
  mousePosition: { x: 0, y: 0 },
  newCommentInput: '',
  setComments: function (_comment: React.SetStateAction<Comment[]>): void {
    throw new Error('Function not implemented.');
  },
  setActiveComment: function (_value: React.SetStateAction<string>): void {
    throw new Error('Function not implemented.');
  },
  setMousePosition: function (
    _position: React.SetStateAction<MousePosition>,
  ): void {
    throw new Error('Function not implemented.');
  },
  setNewCommentInput: function (_value: React.SetStateAction<string>): void {
    throw new Error('Function not implemented.');
  },
  handleCanvasClick: function (_e: MouseEvent<HTMLDivElement>): void {
    throw new Error('Function not implemented.');
  },
  handleCommentSubmit: function (_id: string): void {
    throw new Error('Function not implemented.');
  },
  handleCommentResolve: function (_id: string): void {
    throw new Error('Function not implemented.');
  },
};

export const CommentPinAreaContext = createContext<CommentPinAreaContextType>({
  ...INITIAL_COMMENT_PIN_AREA_CONTEXT_DATA,
});
`}</CodeBlock>
        <h3>Step 3: Building the Provider</h3>
        <p>
          The provider component is where the magic happens. It manages all the
          state and logic:
        </p>
        <CodeBlock lang="typescript">
          {`'use client';

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
`}
        </CodeBlock>
        <p>This provider handles:</p>
        <ul className="list-inside list-disc">
          <li className="list-item">
            Creating new comments at click positions
          </li>
          <li className="list-item">Managing comment state transitions</li>
          <li className="list-item">
            Handling comment submission and resolution
          </li>
        </ul>
        <h3>Step 4: Creating the Comment Pin Area</h3>
        <p>Now for the visual component that users interact with:</p>
        <CodeBlock lang="typescript">
          {`export function CommentPinArea({ allowComment }: CommentPinAreaProps) {
  const { comments, handleCanvasClick } = useContext(CommentPinAreaContext);

  return (
    <section className="comment-accessible-section w-full h-full overflow-hidden">
      <div
        className="comment-pinable-canvas relative w-full h-full"
        onClick={manageHandleCanvasClick}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
    </section>
  );
}`}
        </CodeBlock>
        <p>
          This component creates a canvas-like area where users can click to add
          comments. It renders all existing comments using the CommentItem
          component.
        </p>
        <h3>Step 5: Building the Comment Item</h3>
        <p>
          The CommentItem component is where we implement our Dynamic
          Island-style UI:
        </p>
        <CodeBlock lang="typescript">
          {`function CommentItem(comment: Comment) {
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
    textarea.style.height = \`${'${textarea.scrollHeight}'}px\`;
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
          src={\`https://github.com/${'${TEST_USER}'}.png\`}
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
}`}
        </CodeBlock>
        <h3>ending notes</h3>
        <p>
          This Dynamic Island-style comment component shows how modern React
          features, TypeScript, and animation libraries can create a polished,
          interactive UI. The combination of Context for state management,
          Framer Motion for animations, and TypeScript for type safety results
          in a robust, maintainable component.
        </p>
      </WritingContent>
    </WritingContainer>
  );
}

function MainCommentPinDemo() {
  const [allowComment, setAllowComment] = useState<boolean>(true);

  const toggleAllowComment = () => {
    setAllowComment((allow) => !allow);
  };

  return (
    <DemoBlock className="h-[420px]">
      <CommentPinArea allowComment={allowComment} />
      <DemoBlockFooter>
        <button onClick={toggleAllowComment}>
          comment mode: {allowComment ? 'on' : 'off'}
        </button>
      </DemoBlockFooter>
    </DemoBlock>
  );
}
