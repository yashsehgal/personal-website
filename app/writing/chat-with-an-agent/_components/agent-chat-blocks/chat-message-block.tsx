'use client';
import { ChatMessageLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface ChatMessageBlockProps {
  config: ChatMessageLogConfig;
  index: number;
}

export function ChatMessageBlock({ config, index }: ChatMessageBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 0.2 * index, type: 'tween' }}>
      <p className="text-sm">{config.message}</p>
    </motion.div>
  );
}
