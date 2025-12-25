'use client';
import { ReadFileLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface ReadFileBlockProps {
  config: ReadFileLogConfig;
}

export function ReadFileBlock({ config }: ReadFileBlockProps) {
  return (
    <motion.div
      key={config.message}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween' }}>
      <div className="flex flex-col items-start justify-start gap-1 border text-sm p-3 bg-neutral-100 rounded-xl">
        <div className="flex items-center justify-start gap-1">
          <p className="text-neutral-600 font-medium">Reading</p>
          <p className="text-neutral-500">{config.file_path}</p>
        </div>
        <p className="text-xs text-neutral-500">{config.message}</p>
      </div>
    </motion.div>
  );
}
