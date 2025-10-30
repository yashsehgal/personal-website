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
import { useEffect, useState } from 'react';

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
    position: {
      initial: { x: 700, y: 800 },
      animate: { x: 40, y: 40 },
    },
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
    position: {
      initial: { x: 600, y: 800 },
      animate: { x: 80, y: 40 },
    },
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
    position: {
      initial: { x: 200, y: 800 },
      animate: { x: 120, y: 40 },
    },
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
    position: {
      initial: { x: 0, y: 800 },
      animate: { x: 160, y: 40 },
    },
  },
  {
    name: 'Google',
    apps: [
      {
        name: 'Google',
        iconImagePathname: 'google.svg',
      },
      {
        name: 'Google Calendar',
        iconImagePathname: 'google-calendar.svg',
      },
      {
        name: 'Gmail',
        iconImagePathname: 'google-mail.svg',
      },
      {
        name: 'Google Maps',
        iconImagePathname: 'google-maps.svg',
      },
    ],
    position: {
      initial: { x: 300, y: 600 },
      animate: { x: -345, y: 190 },
    },
  },
  {
    name: 'Work',
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
    position: {
      initial: { x: 200, y: 800 },
      animate: { x: -305, y: 190 },
    },
  },
  {
    name: 'Maps',
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
    position: {
      initial: { x: 300, y: 600 },
      animate: { x: 312, y: 70 },
    },
  },
] as const;

export function IOSLikeAppDrawerDemo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div
      className="h-full w-full relative"
      style={{
        backgroundImage: 'url(/assets/bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() => {
        setIsOpen(false);
      }}>
      <motion.div
        key="ios-like-app-drawer-dock"
        className="select-none flex items-center justify-center gap-2 py-2 pl-3 pr-2.5 rounded-xl border border-white/20 absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-lg divide-x divide-white/30"
        initial={{ y: 0, x: -95 }}
        animate={{
          y: isOpen ? 56 : 0,
          filter: isOpen ? 'blur(6px)' : undefined,
        }}
        transition={{ type: 'spring', duration: 0.8 }}>
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
        <div className="App-drawer-container flex flex-row items-center justify-start flex-wrap">
          {FOLDER_TILES.map((folder, index) => {
            return (
              <AppDrawerFolderTile
                key={folder.name}
                folder={folder}
                isOpen={isOpen}
                index={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
