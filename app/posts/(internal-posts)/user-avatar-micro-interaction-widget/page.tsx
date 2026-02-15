'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { IconCoinFilled, IconCurrencyDollar } from '@tabler/icons-react';
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
          return 100;
        }
        return prev + 100 / (FILL_DURATION_MS / FILL_TICK_MS);
      });
    }, FILL_TICK_MS);
  };

  const resetProgress = () => {
    clearProgressInterval();
    setIsResetting(true);
    setIsPressed(false);
    setProgress(0);
  };

  const progressTransition = isResetting
    ? { duration: RESET_TRANSITION_MS, ease: 'easeOut' as const }
    : { duration: FILL_TRANSITION_MS, ease: 'linear' as const };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        className="rounded-full px-6 py-2 text-base font-medium flex items-center justify-center bg-blue-100 text-blue-500 cursor-pointer relative overflow-hidden"
        onMouseDown={startProgress}
        onMouseUp={resetProgress}
        onMouseLeave={resetProgress}
        onTouchStart={startProgress}
        onTouchEnd={resetProgress}
        onTouchCancel={resetProgress}
        animate={{ scale: isPressed ? 0.97 : 1 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}>
        <motion.div
          className="absolute inset-0 z-0 bg-blue-500"
          animate={{ width: `${progress}%` }}
          transition={progressTransition}
        />
        <span className="relative z-10 text-blue-500 flex items-center gap-2">
          <IconCurrencyDollar size={20} />
          <span>Proceed to payment</span>
        </span>
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center"
          animate={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          transition={progressTransition}>
          <span className="flex items-center gap-2 whitespace-nowrap text-white">
            <IconCurrencyDollar size={20} />
            <span>Proceed to payment</span>
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
}
