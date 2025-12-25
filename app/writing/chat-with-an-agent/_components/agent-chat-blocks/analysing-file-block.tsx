'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { AnalysingFileLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface AnalysingFileBlockProps {
  config: AnalysingFileLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function AnalysingFileBlock({
  config,
  duration,
}: AnalysingFileBlockProps) {
  return (
    <div key={config.message} className="py-2">
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3">
        <p className="text-neutral-600 font-medium">Analysing</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
