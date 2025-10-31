'use client';

import { DemoApplicationInterface } from '@/app/writing/ios-like-app-drawer/_components/ios-like-app-drawer-demo';
import { cn } from '@/helpers';
import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export interface AppDrawerFolderTileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  folder: {
    name: string;
    apps: DemoApplicationInterface[];
    position: {
      initial: { x: number; y: number };
      animate: { x: number; y: number };
    };
  };
  isOpen: boolean;
  index: number;
}

export function AppDrawerFolderTile({
  folder,
  className,
  isOpen,
  onClick,
  index,
  ...props
}: AppDrawerFolderTileProps) {
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <motion.div
      key={folder.name}
      onClick={handleOnClick}
      initial={{
        // filter: 'blur(12px)',
        scale: 0.1,
        x: folder.position.initial.x,
        y: folder.position.initial.y,
      }}
      animate={
        isOpen && {
          // filter: 'blur(0px)',
          scale: 1,
          x: folder.position.animate.x,
          y: folder.position.animate.y,
        }
      }
      transition={{
        type: 'spring',
        duration: 0.4,
        bounce: 0.2,
        delay: 0.03 * index,
      }}
      className="flex flex-col items-center justify-center w-fit h-fit gap-2 cursor-pointer select-none focus-visible:outline-none"
      {...(props as MotionProps)}>
      <div
        className={cn(
          'w-24 h-24 p-3 border shadow border-white/20 rounded-3xl grid grid-cols-2 items-center justify-center gap-2 bg-gradient-to-b from-white/5 to-white/20 backdrop-blur-2xl',
          className,
        )}
        {...props}>
        {folder.apps.map((app) => {
          return (
            <motion.div key={app.name}>
              <Image
                src={`/assets/app-icons/${app.iconImagePathname}`}
                alt={app.name}
                width={36}
                height={36}
              />
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-white font-medium">{folder.name}</p>
    </motion.div>
  );
}
