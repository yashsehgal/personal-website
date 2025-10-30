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
  };
}

export function AppDrawerFolderTile({
  folder,
  className,
  children: _,
  ...props
}: AppDrawerFolderTileProps) {
  return (
    <motion.div className="flex flex-col items-center justify-center w-fit h-fit gap-2">
      <div
        className={cn(
          'w-24 h-24 p-3 border rounded-3xl grid grid-cols-2 items-center justify-center gap-3',
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
