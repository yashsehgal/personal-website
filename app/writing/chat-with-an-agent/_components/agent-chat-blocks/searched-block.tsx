'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { SearchedLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface SearchedBlockProps {
  config: SearchedLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function SearchedBlock({ config, duration: _ }: SearchedBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3 py-2">
        <p className="text-neutral-600 font-medium">Searched</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
