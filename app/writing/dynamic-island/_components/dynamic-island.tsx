'use client';
import { cn } from '@/helpers';
import { motion, MotionProps } from 'framer-motion';
import { DYNAMIC_ISLAND_STATE, DynamicIslandProps } from './types';
import { useContext, useEffect, useState } from 'react';
import { DynamicIslandContext } from './dynamic-island-context';

function getDynamicIslandWidthByState(state: DYNAMIC_ISLAND_STATE): string {
  switch (state) {
    case DYNAMIC_ISLAND_STATE.IDLE:
      return '130px';
    case DYNAMIC_ISLAND_STATE.SUGGESTIVE:
      return '220px';
    case DYNAMIC_ISLAND_STATE.EXPANDED:
      return '260px';
    default:
      return '';
  }
}

function getDynamicIslandBorderRaduisByState(
  state: DYNAMIC_ISLAND_STATE,
): string {
  switch (state) {
    case DYNAMIC_ISLAND_STATE.IDLE:
      return 'rounded-full';
    case DYNAMIC_ISLAND_STATE.SUGGESTIVE:
      return 'rounded-full';
    case DYNAMIC_ISLAND_STATE.EXPANDED:
      return 'rounded-3xl';
    default:
      return '';
  }
}

export function DynamicIsland({ className, ...props }: DynamicIslandProps) {
  const { state } = useContext(DynamicIslandContext);

  // Custom blur state whenever there is a state change
  const [showBlur, setShowBlur] = useState<boolean>(false);

  useEffect(() => {
    setShowBlur(true);
    const showBlurTimeout = setTimeout(() => setShowBlur(false), 200);
    return () => clearTimeout(showBlurTimeout);
  }, [state]);

  return (
    <motion.div
      className={cn(
        'dynamic-island p-2 bg-black overflow-hidden font-sans text-white shadow-md shadow-black/20',
        getDynamicIslandBorderRaduisByState(state),
        className,
      )}
      animate={{
        width: getDynamicIslandWidthByState(state),
        scale: state === DYNAMIC_ISLAND_STATE.EXPANDED ? 1.2 : 1,
        filter: showBlur ? 'blur(2px)' : 'blur(0px)',
        y: state === DYNAMIC_ISLAND_STATE.EXPANDED ? 4 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        bounce: 0,
        filter: {
          type: 'spring',
          duration: 0.2,
        },
      }}
      {...(props as MotionProps)}></motion.div>
  );
}
