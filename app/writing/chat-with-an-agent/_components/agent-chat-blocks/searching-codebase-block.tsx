'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { SearchingCodebaseLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface SearchingCodebaseBlockProps {
  config: SearchingCodebaseLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function SearchingCodebaseBlock({
  config,
  duration,
}: SearchingCodebaseBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex items-start justify-start gap-2 text-sm px-3 py-2">
        <p className="text-neutral-600 font-medium">Searching</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
