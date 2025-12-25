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

export function ChatWithAnAgentPreviewComponent() {
  const RenderLogComponent = (log: AgentChatLogType) => {
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
    <div className="max-w-2xl w-full">
      {AGENT_CHAT_PREVIEW_LOG.map((log, index) => {
        return <RenderLogComponent {...log} key={index} />;
      })}
    </div>
  );
}
