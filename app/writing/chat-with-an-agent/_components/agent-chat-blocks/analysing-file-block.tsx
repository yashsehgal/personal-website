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
  const durationToDisplay = (duration / 100).toPrecision(3);
  return (
    <div key={config.message} className="py-2">
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3 group/container">
        <div className="flex items-center justify-start gap-1">
          <p className="text-neutral-600 font-medium">Analysing</p>
          <p className="text-xs text-neutral-400 mt-[1px] hidden group-hover/container:block">
            {durationToDisplay}s
          </p>
        </div>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
