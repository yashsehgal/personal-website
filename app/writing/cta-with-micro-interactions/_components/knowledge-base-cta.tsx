'use client';
import { cn } from '@/helpers';
import {
  IconBrandGoogleDrive,
  IconPhoto,
  IconPlus,
  IconTable,
  IconTypography,
} from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { motion, MotionStyle } from 'framer-motion';

enum ELEMENT {
  IMAGE = 'IMAGE',
  SPREADSHEET = 'SPREADSHEET',
  DRIVE = 'DRIVE',
  TEXT = 'TEXT',
}

const KNOWLEDGE_BASE_ELEMENTS: Record<ELEMENT, ReactNode> = {
  [ELEMENT.IMAGE]: (
    <div className="Element-image w-12 h-12 rounded-xl flex items-center justify-center bg-blue-600 text-white">
      <IconPhoto />
    </div>
  ),
  [ELEMENT.SPREADSHEET]: (
    <div className="Element-spreadsheet w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-600 text-white">
      <IconTable />
    </div>
  ),
  [ELEMENT.TEXT]: (
    <div className="Element-text w-12 h-12 rounded-xl flex items-center justify-center bg-black text-white">
      <IconTypography />
    </div>
  ),
  [ELEMENT.DRIVE]: (
    <div className="Element-google-drive w-12 h-12 rounded-xl flex items-center justify-center bg-red-600 text-white">
      <IconBrandGoogleDrive />
    </div>
  ),
} as const;

const MOTION_ELEMENTS_INITIAL_Y: number = 12 as const; // Y magnitude

function getElementStyle(element: ELEMENT): MotionStyle {
  switch (element) {
    case ELEMENT.IMAGE:
      return {
        right: 135,
        rotate: -12,
      };
    case ELEMENT.SPREADSHEET:
      return {
        right: 95,
        rotate: 4,
      };
    case ELEMENT.TEXT:
      return {
        right: 55,
        rotate: -8,
      };
    case ELEMENT.DRIVE:
      return {
        right: 10,
        rotate: 12,
      };
  }
}

export function KnowledgeBaseCTA() {
  const [hoveringCTA, setHoveringCTA] = useState<boolean>(false);
  return (
    <div
      className={cn(
        'Knowledge-base-cta-card relative w-[420px] rounded-xl bg-gray-100 border drop-shadow-sm font-sans cursor-default transition-shadow',
        hoveringCTA && 'border-indigo-400 ring-4 ring-indigo-200 bg-indigo-50',
      )}
      onMouseEnter={() => setHoveringCTA(true)}
      onMouseLeave={() => setHoveringCTA(false)}>
      <div className="Knowledge-base-cta-card--bg-elements-wrapper p-3 flex items-center justify-end gap-2">
        {hoveringCTA &&
          Object.keys(KNOWLEDGE_BASE_ELEMENTS).map((element, index) => {
            const typedElement = element as ELEMENT;
            return (
              <motion.div
                key={index}
                initial={{
                  y: MOTION_ELEMENTS_INITIAL_Y * (index + 1),
                }}
                animate={{ y: 0 }}
                style={{
                  top: -18,
                  ...getElementStyle(typedElement),
                }}
                transition={{
                  type: 'spring',
                  bounce: 1,
                  stiffness: 160,
                  delay: 0.04 * index,
                }}
                className="w-fit h-fit border-2 border-white rounded-xl shadow-lg absolute">
                {KNOWLEDGE_BASE_ELEMENTS[typedElement]}
              </motion.div>
            );
          })}
      </div>
      <div className="Knowledge-base-cta-card--main-content-container bg-white p-6 rounded-xl border-t z-20 relative">
        <h1 className="text-lg font-medium">Knowledge Base</h1>
        <p className="text-sm mt-1 text-gray-500 w-[36ch]">
          A knowledge base is a collection of documents and images, providing
          better context.
        </p>
        <button
          className={cn(
            'flex items-center justify-center w-fit px-3 py-1 rounded-md border bg-white text-sm gap-2 drop-shadow-sm hover:bg-gray-100 mt-4',
            hoveringCTA && 'shadow-2xl',
          )}>
          <span className="cta-button-icon-wrapper">
            <IconPlus size={14} />
          </span>
          <span className="cta-button-text">Create knowledge base</span>
        </button>
      </div>
    </div>
  );
}
