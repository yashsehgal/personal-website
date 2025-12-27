'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { ThinkingLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface ThinkingBlockProps {
  config: ThinkingLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function ThinkingBlock({ config, duration }: ThinkingBlockProps) {
  const durationToDisplay = (duration / 100).toPrecision(3);
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3 py-2 group/container">
        <div className="flex items-center justify-start gap-1">
          <p className="text-neutral-600 font-medium">Thinking</p>
          <p className="text-xs text-neutral-400 mt-[1px] hidden group-hover/container:block">
            {durationToDisplay}s
          </p>
        </div>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
