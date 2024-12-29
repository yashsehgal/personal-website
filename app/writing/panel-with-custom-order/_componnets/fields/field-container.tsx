'use client';
import { IconGripHorizontal } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface IFieldContainerProps {
  name: string;
  children: ReactNode;
}

export function FieldContainer({ children, name }: IFieldContainerProps) {
  return (
    <motion.div
      className="Field-container drop-shadow-md rounded-xl bg-neutral-900 divide-y w-[320px] divide-neutral-600 overflow-hidden"
      drag
      draggable
      dragConstraints={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}>
      <div className="Field-container--top-layer py-2 px-4 flex items-center justify-between bg-neutral-900">
        <p className="Field-container--field-name text-xs select-none cursor-default font-medium text-neutral-300">
          {name}
        </p>
        <IconGripHorizontal size={14} className="cursor-grab text-white" />
      </div>
      <div className="Field-container--body-wrapper p-4 bg-neutral-800">
        {children}
      </div>
    </motion.div>
  );
}
