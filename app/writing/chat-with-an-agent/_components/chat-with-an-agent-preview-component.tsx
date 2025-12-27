'use client';

import { AnalysingFileBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/analysing-file-block';
import { ChatMessageBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/chat-message-block';
import { FileContentChangeBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/file-content-change-block';
import { ReadFileBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/read-file-block';
import { ReadFolderBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/read-folder-block';
import { SearchedBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/searched-block';
import { SearchingCodebaseBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/searching-codebase-block';
import { ThinkingBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/thinking-block';
import { ThoughtBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/thought-block';
import { TodoListBlock } from '@/app/writing/chat-with-an-agent/_components/agent-chat-blocks/todo-list-block';
import { AGENT_CHAT_PREVIEW_LOG } from '@/app/writing/chat-with-an-agent/_components/constants';
import {
  AGENT_CHAT_LOG_ITEM_TYPE,
  AgentChatLogType,
} from '@/app/writing/chat-with-an-agent/_components/types';
import { useEffect, useRef, useState } from 'react';

export type AgentChatLogWithDurationType = AgentChatLogType & {
  duration: number;
};

export function ChatWithAnAgentPreviewComponent() {
  const [agentChatPreviewLogState, setAgentChatPreviewLogState] = useState<
    AgentChatLogWithDurationType[]
  >([]);

  // keep refs for timers so we can clear on unmount
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startedRef = useRef(false);

  // ref to the scroll container so we can keep newest item in view
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const minDelay = 1200;
    const maxDelay = 1600;

    const randomDelay = () =>
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    const scheduleNext = (index: number) => {
      if (index >= AGENT_CHAT_PREVIEW_LOG.length) return;

      // Getting the random delay initial to use it as log duration
      const delay = randomDelay();
      const _agentChatPreviewLogWithDuration: AgentChatLogWithDurationType = {
        ...AGENT_CHAT_PREVIEW_LOG[index],
        duration: delay,
      };

      const t = setTimeout(() => {
        setAgentChatPreviewLogState((prev) => [
          ...prev,
          _agentChatPreviewLogWithDuration,
        ]);
        scheduleNext(index + 1);
      }, delay);
      timersRef.current.push(t);
    };

    // kick off chain
    scheduleNext(0);

    return () => {
      // cleanup any pending timers on unmount
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  // when a new log is added, scroll the container to the bottom so the newest item is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // wait for the new item to render then scroll
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
  }, [agentChatPreviewLogState.length]);

  const RenderLogComponent = ({
    log,
    duration,
    completed,
  }: {
    log: AgentChatLogType;
    duration: AgentChatLogWithDurationType['duration'];
    completed?: boolean;
  }) => {
    switch (log.agent_chat_log_item_type) {
      case AGENT_CHAT_LOG_ITEM_TYPE.ANALYSING_FILE:
        return <AnalysingFileBlock config={log.config} duration={duration} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE:
        return <ChatMessageBlock config={log.config} duration={duration} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE:
        return (
          <FileContentChangeBlock config={log.config} duration={duration} />
        );
      case AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE:
        return (
          <ReadFileBlock
            config={log.config}
            duration={duration}
            completed={!!completed}
          />
        );
      case AGENT_CHAT_LOG_ITEM_TYPE.READ_FOLDER:
        return (
          <ReadFolderBlock
            config={log.config}
            duration={duration}
            completed={!!completed}
          />
        );
      case AGENT_CHAT_LOG_ITEM_TYPE.SEARCHED:
        return <SearchedBlock config={log.config} duration={duration} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.SEARCHING_CODEBASE:
        return (
          <SearchingCodebaseBlock config={log.config} duration={duration} />
        );
      case AGENT_CHAT_LOG_ITEM_TYPE.THINKING:
        return <ThinkingBlock config={log.config} duration={duration} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.THOUGHT:
        return <ThoughtBlock config={log.config} duration={duration} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.TODO_LIST:
        return <TodoListBlock config={log.config} duration={duration} />;
      default:
        return;
    }
  };

  return (
    <div
      ref={containerRef}
      className="max-w-3xl w-full font-sans space-y-1.5 overflow-y-scroll hide-scroll p-4 border rounded-2xl h-[32rem]">
      {agentChatPreviewLogState.map((log, index) => {
        // Using proper types for logs by removing duration property from it
        const { duration: _, ...logWithoutDuration } = log;
        const isLast = index === agentChatPreviewLogState.length - 1;
        return (
          <RenderLogComponent
            duration={log.duration}
            log={logWithoutDuration}
            completed={isLast}
            key={index}
          />
        );
      })}
    </div>
  );
}
