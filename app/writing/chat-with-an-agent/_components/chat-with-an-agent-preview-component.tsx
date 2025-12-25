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
  AgentChatLogListType,
  AgentChatLogType,
} from '@/app/writing/chat-with-an-agent/_components/types';
import { useEffect, useRef, useState } from 'react';

export function ChatWithAnAgentPreviewComponent() {
  const [agentChatPreviewLogState, setAgentChatPreviewLogState] =
    useState<AgentChatLogListType>([]);

  // keep refs for timers so we can clear on unmount
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const minDelay = 300;
    const maxDelay = 1400;

    const randomDelay = () =>
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    const scheduleNext = (index: number) => {
      if (index >= AGENT_CHAT_PREVIEW_LOG.length) return;
      const t = setTimeout(() => {
        setAgentChatPreviewLogState((prev) => [
          ...prev,
          AGENT_CHAT_PREVIEW_LOG[index],
        ]);
        scheduleNext(index + 1);
      }, randomDelay());
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

  const RenderLogComponent = ({ log }: { log: AgentChatLogType }) => {
    switch (log.agent_chat_log_item_type) {
      case AGENT_CHAT_LOG_ITEM_TYPE.ANALYSING_FILE:
        return <AnalysingFileBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.CHAT_MESSAGE:
        return <ChatMessageBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.FILE_CONTENT_CHANGE:
        return <FileContentChangeBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.READ_FILE:
        return <ReadFileBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.READ_FOLDER:
        return <ReadFolderBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.SEARCHED:
        return <SearchedBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.SEARCHING_CODEBASE:
        return <SearchingCodebaseBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.THINKING:
        return <ThinkingBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.THOUGHT:
        return <ThoughtBlock config={log.config} />;
      case AGENT_CHAT_LOG_ITEM_TYPE.TODO_LIST:
        return <TodoListBlock config={log.config} />;
      default:
        return;
    }
  };

  return (
    <div className="max-w-2xl w-full font-sans space-y-1.5 max-h-[32rem] overflow-y-scroll hide-scroll border p-4 rounded-2xl">
      {agentChatPreviewLogState.map((log, index) => {
        return <RenderLogComponent log={log} key={index} />;
      })}
    </div>
  );
}
