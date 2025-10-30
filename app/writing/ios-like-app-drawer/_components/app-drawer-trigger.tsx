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
  const handleTriggerClick = () => {
    setIsOpen((open) => !open);
  };

  return (
    <motion.button
      key="app-drawer-trigger"
      onClick={handleTriggerClick}
      className="flex items-center gap-0 cursor-pointer"
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', duration: 0.6 }}>
      <div className="w-6 h-6 rounded-md border -z-20 bg-white" />
      <div className="w-8 h-8 rounded-lg border -z-10 -ml-5 bg-white" />
      <div className="w-10 h-10 rounded-xl border z-0 bg-white -ml-7">
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
