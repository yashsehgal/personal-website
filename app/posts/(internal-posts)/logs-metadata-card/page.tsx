'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import {
  IconCheck,
  IconCircleFilled,
  IconTrendingUp,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface LogsItem {
  title: string;
  value: string | ReactNode;
  copyValue: string;
}

const LOGS: LogsItem[] = [
  {
    title: 'Project ID',
    value: 'proj-723423u4989',
    copyValue: 'proj-723423u4989',
  },
  {
    title: 'Project Name',
    value: 'Marketing Assets',
    copyValue: 'Marketing Assets',
  },
  { title: 'Created By', value: 'Yash Sehgal', copyValue: 'Yash Sehgal' },
  {
    title: 'Created At',
    value: '2026-02-04 10:00:00',
    copyValue: '2026-02-04 10:00:00',
  },
  {
    title: 'Last Modified',
    value: '2026-02-04 10:00:00',
    copyValue: '2026-02-04 10:00:00',
  },
  { title: 'Last Modified By', value: 'Yash Sehgal', copyValue: 'Yash Sehgal' },
  {
    title: 'Status',
    value: (
      <span className="flex items-center gap-1.5">
        <IconCircleFilled
          size={12}
          className="text-yellow-500 shrink-0 animate-pulse duration-1000"
        />
        <span>Draft</span>
      </span>
    ),
    copyValue: 'Draft',
  },
] as const;

const COPIED_TO_CLIPBOARD_MESSAGE_DURATION_MS: number = 1200 as const;

export default function LogsPage() {
  return (
    <InternalPostContainer>
      <ComponentPreviewContainer className="h-fit py-24 flex items-center justify-center flex-col gap-12 select-none">
        <LogsCardComponent />
      </ComponentPreviewContainer>
    </InternalPostContainer>
  );
}

function LogsCardComponent() {
  return (
    <div className="shadow-2xs border border-foreground/10 rounded-2xl w-fit h-fit bg-foreground/5 overflow-hidden max-md:scale-90">
      <div className="px-5 py-2">
        <p className="text-secondary text-sm font-medium flex items-center gap-3">
          <IconTrendingUp size={16} />
          Project activity
        </p>
      </div>
      <motion.div className="w-[420px] py-3 bg-background rounded-t-lg ring-1 ring-foreground/10">
        {LOGS.map((log, index) => {
          return <LogItem key={index} log={log} index={index} />;
        })}
      </motion.div>
    </div>
  );
}

function LogItem({ log, index }: { log: LogsItem; index: number }) {
  const [showCopied, setShowCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setShowCopied(true);
    navigator.clipboard.writeText(log.copyValue);
    setTimeout(() => {
      setShowCopied(false);
    }, COPIED_TO_CLIPBOARD_MESSAGE_DURATION_MS);
  };

  return (
    <motion.button
      className="flex items-center justify-between gap-2 px-5 py-1.5 text-sm font-sans cursor-pointer hover:bg-foreground/5 w-full dark:hover:bg-foreground/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 * index, type: 'spring', bounce: 0 }}
      onClick={handleCopy}>
      <motion.p key="log-title" className="text-foreground">
        {log.title}
      </motion.p>
      {showCopied ? (
        <motion.p
          key="copied-to-clipboard-message"
          className="text-foreground flex items-center gap-2 text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.25 }}>
          <IconCheck size={16} />
          Copied to clipboard!
        </motion.p>
      ) : (
        <motion.p
          key="log-value"
          className="text-secondary"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.05 * index,
            type: 'spring',
            bounce: 0,
            duration: 0.25,
          }}>
          {log.value}
        </motion.p>
      )}
    </motion.button>
  );
}
