'use client';
import { ThinkingLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface ThinkingBlockProps {
  config: ThinkingLogConfig;
  index: number;
}

export function ThinkingBlock({ config, index }: ThinkingBlockProps) {
  return (
    <motion.div
      key={config.message}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, type: 'tween' }}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3">
        <p className="text-neutral-600 font-medium">Thinking</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </motion.div>
  );
}
