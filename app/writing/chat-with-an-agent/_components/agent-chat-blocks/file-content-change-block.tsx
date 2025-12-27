'use client';
import { AgentChatLogWithDurationType } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';
import { FileContentChangeLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { IconFile } from '@tabler/icons-react';

interface FileContentChangeBlockProps {
  config: FileContentChangeLogConfig;
  duration: AgentChatLogWithDurationType['duration'];
}

export function FileContentChangeBlock({
  config,
  duration: _,
}: FileContentChangeBlockProps) {
  return (
    <div key={config.file_name}>
      <div className="py-2 px-3 bg-white border flex items-center justify-start gap-2 rounded-lg ring-2 ring-neutral-100 ring-offset-1">
        <IconFile className="text-neutral-400" size={16} />
        <p className="text-sm text-black">{config.file_name}</p>
        <div className="flex items-center justify-start gap-1">
          <span className="text-xs text-green-600 font-medium">
            +{config.diff.addition}
          </span>
          <span className="text-xs text-red-600 font-medium">
            -{config.diff.deletion}
          </span>
        </div>
      </div>
    </div>
  );
}
