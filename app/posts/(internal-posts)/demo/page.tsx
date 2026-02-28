'use client';
import { ComponentPreviewContainer } from '@/components/component-preview-container';
import { InternalPostContainer } from '@/components/sections/internal-post-container';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  return (
    <div className="h-full w-full flex items-center justify-start relative">
      <Image
        src="/demo.png"
        alt="demo"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {Array.from({ length: SEGMENTS }).map((_, index) => {
        return (
          <motion.div
            key={index}
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
    </div>
  );
}
