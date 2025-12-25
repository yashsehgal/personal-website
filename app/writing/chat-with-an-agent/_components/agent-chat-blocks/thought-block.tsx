'use client';
import { ThoughtLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface ThoughtBlockProps {
  config: ThoughtLogConfig;
}

export function ThoughtBlock({ config }: ThoughtBlockProps) {
  return (
    <motion.div
      key={config.message}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween' }}>
      <div className="flex flex-col items-start justify-start gap-1 text-sm px-3">
        <p className="text-neutral-600 font-medium">Thought</p>
        <p className="text-neutral-500">{config.message}</p>
      </div>
    </motion.div>
  );
}
