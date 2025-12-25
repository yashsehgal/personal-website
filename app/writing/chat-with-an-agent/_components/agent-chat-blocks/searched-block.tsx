'use client';
import { SearchedLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface SearchedBlockProps {
  config: SearchedLogConfig;
}

export function SearchedBlock({ config }: SearchedBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3">
        <p className="text-neutral-600 font-medium">Searched</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
