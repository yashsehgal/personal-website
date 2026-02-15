'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { IconCircleCheckFilled, IconCurrencyDollar } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function UserAvatarMicroInteractionWidgetPage() {
  return (
    <InternalPostContainer>
      <ComponentPreviewContainer className="h-96 flex items-center justify-center">
        <UserAvatarMicroInteractionWidgetPreview />
      </ComponentPreviewContainer>
    </InternalPostContainer>
  );
}

const FILL_DURATION_MS = 2000;
const FILL_TICK_MS = 20;
const RESET_TRANSITION_MS = 0.2;
const FILL_TRANSITION_MS = 0.02;

function UserAvatarMicroInteractionWidgetPreview() {
  const [progress, setProgress] = useState<number>(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showCompletedContent, setShowCompletedContent] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startProgress = () => {
    clearProgressInterval();
    setIsResetting(false);
    setIsPressed(true);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearProgressInterval();
          setShowCompletedContent(true);
          return 100;
        }
        return prev + 200 / (FILL_DURATION_MS / FILL_TICK_MS);
      });
    }, FILL_TICK_MS);
  };

  const resetProgress = () => {
    clearProgressInterval();
    setIsResetting(true);
    setIsPressed(false);
    setShowCompletedContent(false);
    setProgress(0);
  };

  const progressTransition = isResetting
    ? { duration: RESET_TRANSITION_MS, ease: 'easeOut' as const }
    : { duration: FILL_TRANSITION_MS, ease: 'linear' as const };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        className={`rounded-full px-6 py-2 text-base font-medium flex items-center justify-center cursor-pointer relative overflow-hidden ${
          showCompletedContent
            ? 'bg-green-600 text-green-100'
            : 'bg-blue-50 text-blue-500 dark:bg-blue-950'
        }`}
        onMouseDown={startProgress}
        onMouseUp={resetProgress}
        onMouseLeave={resetProgress}
        onTouchStart={startProgress}
        onTouchEnd={resetProgress}
        onTouchCancel={resetProgress}
        animate={{ scale: isPressed ? 0.97 : 1 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}>
        <motion.div
          className={`absolute inset-0 z-0 ${
            showCompletedContent ? 'bg-green-600' : 'bg-blue-400'
          }`}
          animate={{ width: `${progress}%` }}
          transition={progressTransition}
        />
        <span
          className={`relative z-10 flex items-center gap-2 ${
            showCompletedContent ? 'text-green-100' : 'text-blue-500'
          }`}>
          {showCompletedContent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}>
              <IconCircleCheckFilled size={20} />
            </motion.div>
          ) : (
            <IconCurrencyDollar size={20} />
          )}
          {showCompletedContent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}>
              Payment completed
            </motion.div>
          ) : (
            <span>Proceed to payment</span>
          )}
        </span>
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center rounded-full"
          animate={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          transition={progressTransition}>
          <span className="flex items-center gap-2 whitespace-nowrap text-white">
            {showCompletedContent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}>
                <IconCircleCheckFilled size={20} />
              </motion.div>
            ) : (
              <IconCurrencyDollar size={20} />
            )}
            {showCompletedContent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}>
                Payment completed
              </motion.div>
            ) : (
              <span>Proceed to payment</span>
            )}
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
}
