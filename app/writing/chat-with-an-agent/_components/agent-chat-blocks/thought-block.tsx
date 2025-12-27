'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { ThoughtLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface ThoughtBlockProps {
  config: ThoughtLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function ThoughtBlock({ config, duration: _ }: ThoughtBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3 py-2">
        <p className="text-neutral-600 font-medium">Thought</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
