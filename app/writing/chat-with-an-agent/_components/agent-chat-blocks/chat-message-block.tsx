'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { ChatMessageLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface ChatMessageBlockProps {
  config: ChatMessageLogConfig;
}

export function ChatMessageBlock({ config }: ChatMessageBlockProps) {
  return (
    <div key={config.message} className="px-3 py-2">
      <p className="text-sm">{config.message}</p>
    </div>
  );
}
