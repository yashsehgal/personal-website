'use client';
import {
  AppDrawerFolderTile,
  AppDrawerFolderTileProps,
} from '@/app/writing/ios-like-app-drawer/_components/app-drawer-folder-tile';
import { AppDrawerTrigger } from '@/app/writing/ios-like-app-drawer/_components/app-drawer-trigger';
import {
  IconBrandPinterestFilled,
  IconSettings,
  ReactNode,
  TablerIcon,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export interface DemoApplicationInterface {
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

const FOLDER_TILES: AppDrawerFolderTileProps['folder'][] = [
  {
    name: 'Utilities',
    apps: [
      {
        name: 'Reminders',
        iconImagePathname: 'reminders.svg',
      },
      {
        name: 'Calculator',
        iconImagePathname: 'calculator.svg',
      },
      {
        name: 'Camera',
        iconImagePathname: 'camera.svg',
      },
      {
        name: 'Notes',
        iconImagePathname: 'notes.svg',
      },
    ],
  },
  {
    name: 'Social',
    apps: [
      {
        name: 'Netflix',
        iconImagePathname: 'netflix.svg',
      },
      {
        name: 'AppleTV',
        iconImagePathname: 'apple-tv.svg',
      },
      {
        name: 'AppleMusic',
        iconImagePathname: 'apple-music.svg',
      },
      {
        name: 'YouTube',
        iconImagePathname: 'youtube.svg',
      },
    ],
  },
  {
    name: 'Creative',
    apps: [
      {
        name: 'Dribbble',
        iconImagePathname: 'dribbble.svg',
      },
      {
        name: 'Garage Band',
        iconImagePathname: 'garageband.svg',
      },
      {
        name: 'Figma',
        iconImagePathname: 'figma.svg',
      },
      {
        name: 'Adobe',
        iconImagePathname: 'adobe.svg',
      },
    ],
  },
  {
    name: 'Travel',
    apps: [
      {
        name: 'Navigation',
        iconImagePathname: 'navigation.svg',
      },
      {
        name: 'Uber',
        iconImagePathname: 'uber.svg',
      },
      { name: 'Apple Maps', iconImagePathname: 'apple-maps.svg' },
    ],
  },
] as const;

export function IOSLikeAppDrawerDemo() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="h-full w-full relative">
      <motion.div className="flex items-center justify-center gap-2 py-2 pl-3 pr-2.5 rounded-xl border absolute bottom-3 left-1/2 -translate-x-1/2 bg-white backdrop-blur-lg divide-x">
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
          <AppDrawerTrigger setIsOpen={setIsOpen} />
        </div>
      </motion.div>
      {isOpen && (
        <div className="App-drawer-container">
          {FOLDER_TILES.map((folder) => {
            return <AppDrawerFolderTile key={folder.name} folder={folder} />;
          })}
        </div>
      )}
    </div>
  );
}
