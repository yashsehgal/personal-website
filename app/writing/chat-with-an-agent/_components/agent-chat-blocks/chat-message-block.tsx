'use client';
import { ChatMessageLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { motion } from 'framer-motion';

interface ChatMessageBlockProps {
  config: ChatMessageLogConfig;
}

export function ChatMessageBlock({ config }: ChatMessageBlockProps) {
  return (
    <div key={config.message}>
      <p className="text-sm">{config.message}</p>
    </div>
  );
}
