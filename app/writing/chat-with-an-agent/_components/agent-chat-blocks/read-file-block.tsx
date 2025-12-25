'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { ReadFileLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface ReadFileBlockProps {
  config: ReadFileLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function ReadFileBlock({ config, duration }: ReadFileBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3 py-2">
        <div className="flex items-center justify-start gap-1">
          <p className="text-neutral-600 font-medium">Reading</p>
          <p className="text-neutral-500">{config.file_path}</p>
        </div>
        <p className="text-xs text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
