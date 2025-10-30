'use client';

import { DemoApplicationInterface } from '@/app/writing/ios-like-app-drawer/_components/ios-like-app-drawer-demo';
import { cn } from '@/helpers';
import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';

export interface AppDrawerFolderTileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  folder: {
    name: string;
    apps: DemoApplicationInterface[];
    position: {
      initial: { x: number; y: number };
      animate: { x: number; y: number };
    };
  };
  isOpen: boolean;
}

export function AppDrawerFolderTile({
  folder,
  className,
  children: _,
  isOpen,
  ...props
}: AppDrawerFolderTileProps) {
  return (
    <motion.div
      key={folder.name}
      className="flex flex-col items-center justify-center w-fit h-fit gap-2 pointer-events-none cursor-default select-none"
      initial={{
        filter: 'blur(24px)',
        scale: 0,
        x: folder.position.initial.x,
        y: folder.position.initial.y,
      }}
      animate={
        isOpen && {
          filter: 'blur(0px)',
          scale: 1,
          x: folder.position.animate.x,
          y: folder.position.animate.y,
        }
      }
      transition={{
        type: 'spring',
        duration: 1.2,
        bounce: 0.2,
        stiffness: 50,
        damping: 12,
      }}
      {...(props as MotionProps)}>
      <div
        className={cn(
          'w-24 h-24 p-3 border rounded-3xl grid grid-cols-2 items-center justify-center gap-3 bg-white/30 backdrop-blur-lg',
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
      <p className="text-xs">{folder.name}</p>
    </motion.div>
  );
}
