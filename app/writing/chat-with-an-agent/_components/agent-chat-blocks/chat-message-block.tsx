'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { ChatMessageLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface ChatMessageBlockProps {
  config: ChatMessageLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function ChatMessageBlock({ config, duration }: ChatMessageBlockProps) {
  return (
    <div key={config.message} className="px-3 py-2">
      <p className="text-sm">{config.message}</p>
    </div>
  );
}
