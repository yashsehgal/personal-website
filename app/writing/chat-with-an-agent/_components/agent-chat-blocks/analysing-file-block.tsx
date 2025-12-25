'use client';
import { AnalysingFileLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface AnalysingFileBlockProps {
  config: AnalysingFileLogConfig;
}

export function AnalysingFileBlock({ config }: AnalysingFileBlockProps) {
  return (
    <div key={config.message}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3">
        <p className="text-neutral-600 font-medium">Analysing</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </div>
  );
}
