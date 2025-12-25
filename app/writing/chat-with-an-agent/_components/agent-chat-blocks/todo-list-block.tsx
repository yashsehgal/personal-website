'use client';
import { TodoListLogConfig } from '@/app/writing/chat-with-an-agent/_components/types';
import { IconCircle, IconCircleCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface TodoListBlockProps {
  config: TodoListLogConfig;
  index: number;
}

export function TodoListBlock({ config, index }: TodoListBlockProps) {
  return (
    <motion.div
      key={config.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, type: 'tween' }}>
      <div className="bg-white border rounded-xl divide-y w-[0%]">
        <div className="px-3 py-1.5 text-xs">{config.title}</div>
        <div className="p-3 flex flex-col items-start gap-2 justify-start">
          {config.todo_list_items.map((todoItem, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-start gap-1 truncate w-full">
                {todoItem.completed ? (
                  <IconCircleCheck
                    size={14}
                    className="text-neutral-400 shrink-0"
                  />
                ) : (
                  <IconCircle size={14} className="text-neutral-400 shrink-0" />
                )}
                <p className="text-xs text-neutral-500 truncate">
                  {todoItem.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
