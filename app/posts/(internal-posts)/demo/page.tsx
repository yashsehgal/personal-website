'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { IconReload } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const SEGMENTS: number = 20 as const;

export default function Page() {
  return (
    <InternalPostContainer>
      <ComponentPreviewContainer className="h-[480px]">
        <DemoPreview />
      </ComponentPreviewContainer>
    </InternalPostContainer>
  );
}

function DemoPreview() {
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <div className="h-full w-full flex items-center justify-start relative">
      <Image
        preload
        src="/demo.png"
        alt="demo"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {Array.from({ length: SEGMENTS }).map((_, index) => {
        return (
          <motion.div
            key={`${animationKey}-${index}`}
            initial={{ filter: 'brightness(10)' }}
            animate={{
              filter: 'brightness(1)',
              background: 'none',
              boxShadow: 'none',
              backdropFilter: 'none',
            }}
            transition={{
              type: 'spring',
              bounce: 0,
              delay: 0.05 * index,
            }}
            className="h-full w-20 bg-linear-to-b from-background/10 via-background/15 to-background/10 backdrop-blur-xs shadow-lg"
          />
        );
      })}
      <motion.button
        key={animationKey}
        className="bg-background/5 hover:bg-background/10 transition-colors backdrop-blur-md rounded-full size-11 flex items-center justify-center absolute top-4 right-4 shadow-xl text-background border border-background/10 cursor-pointer"
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.5,
          delay: 2.1,
        }}
        onClick={() => {
          new Audio('/sounds/image.mp3').play();
          setAnimationKey((k) => k + 1);
        }}>
        <IconReload size={20} />
      </motion.button>
    </div>
  );
}
