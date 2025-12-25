'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { ReadFolderLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';

interface ReadFolderBlockProps {
  config: ReadFolderLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function ReadFolderBlock({ config, duration }: ReadFolderBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3 py-2">
        <div className="flex items-center justify-start gap-1">
          <p className="text-neutral-600 font-medium">Reading in</p>
          <p className="text-neutral-500">{config.folder_path}</p>
        </div>
        <p className="text-xs text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
