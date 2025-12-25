'use client';
import { SearchingCodebaseLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface SearchingCodebaseBlockProps {
  config: SearchingCodebaseLogConfig;
}

export function SearchingCodebaseBlock({
  config,
}: SearchingCodebaseBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex items-start justify-start gap-2 text-sm px-3">
        <p className="text-neutral-600 font-medium">Searching</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
