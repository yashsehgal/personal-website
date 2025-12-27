'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { ReadFolderLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { IconCheck, IconLoader2 } from '@tabler/icons-react';

interface ReadFolderBlockProps {
  config: ReadFolderLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
  completed: boolean;
}

export function ReadFolderBlock({
  config,
  duration,
  completed,
}: ReadFolderBlockProps) {
  const durationToDisplay = (duration / 100).toPrecision(3);
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3 py-2 group/container">
        <div className="flex items-center justify-start gap-1">
          {completed ? (
            <IconLoader2 className="animate-spin shrink-0" size={14} />
          ) : (
            <IconCheck className="shrink-0" size={14} />
          )}
          <div className="flex items-center justify-start gap-1">
            <p className="text-neutral-600 font-medium">Read in</p>
            <p className="text-neutral-500">{config.folder_path}</p>
            <p className="text-xs text-neutral-400 mt-[1px] hidden group-hover/container:block">
              {durationToDisplay}s
            </p>
          </div>
        </div>
        <p className="text-xs text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
