'use client';
import { AppDrawerTrigger } from '@/app/writing/ios-like-app-drawer/_components/app-drawer-trigger';
import {
  IconBrandPinterestFilled,
  IconSettings,
  ReactNode,
  TablerIcon,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DemoApplicationInterface {
  name: string;
  iconImagePathname: string;
}

const DEMO_APPLICATIONS: DemoApplicationInterface[] = [
  {
    name: 'Pinterest',
    iconImagePathname: 'pinterest.svg',
  },
  {
    name: 'Stocks',
    iconImagePathname: 'stocks.svg',
  },
  {
    name: 'Clock',
    iconImagePathname: 'clock.svg',
  },
] as const;

export function IOSLikeAppDrawerDemo() {
  return (
    <div className="h-full w-full relative">
      <motion.div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border absolute bottom-3 left-1/2 -translate-x-1/2 bg-white backdrop-blur-lg divide-x">
        <div className="flex items-center justify-start gap-2">
          {DEMO_APPLICATIONS.map((app) => {
            return (
              <motion.div key={app.name} className="w-fit h-fit">
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
        <div className="flex items-center justify-end gap-2 pl-2">
          <AppDrawerTrigger />
        </div>
      </motion.div>
    </div>
  );
}
