'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { SetStateAction } from 'react';

const APP_DRAWER_TRIGGER_ICON_PATHNAMES: string[] = [
  'apple-music.svg',
  'calculator.svg',
  'camera.svg',
  'netflix.svg',
] as const;

interface AppDrawerTriggerProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function AppDrawerTrigger({ setIsOpen }: AppDrawerTriggerProps) {
  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((open) => !open);
  };

  return (
    <motion.button
      key="app-drawer-trigger"
      onClick={handleTriggerClick}
      className="flex items-center gap-0 cursor-pointer focus-visible:outline-none"
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', duration: 0.6 }}>
      <div className="w-6 h-6 rounded-md border border-white/10 -z-20 bg-transparent backdrop-blur-lg" />
      <div className="w-8 h-8 rounded-lg border border-white/20 -z-10 -ml-5 bg-transparent backdrop-blur-lg" />
      <div className="w-10 h-10 rounded-xl border border-white/20 z-0 bg-transparent -ml-7 backdrop-blur-3xl">
        <div className="grid grid-cols-2 items-center justify-center w-full h-full scale-[85%] pl-[3px]">
          {APP_DRAWER_TRIGGER_ICON_PATHNAMES.map((app, index) => {
            return (
              <motion.div key={index} className="w-3.5 h-3.5 shrink-0">
                <Image
                  src={`/assets/app-icons/${app}`}
                  alt={app}
                  width={24}
                  height={24}
                  className="h-full w-full"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.button>
  );
}
