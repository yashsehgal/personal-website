'use client';
import { cn } from '@/helpers';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconBrandDiscord,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandSlack,
  IconBrandX,
  TablerIcon,
} from '@tabler/icons-react';

interface IPlatform {
  name: string;
  icon: TablerIcon;
}

const PLATFORMS: IPlatform[] = [
  { name: 'X', icon: IconBrandX },
  { name: 'Instagram', icon: IconBrandInstagram },
  { name: 'Google', icon: IconBrandGoogle },
  { name: 'Slack', icon: IconBrandSlack },
  { name: 'Discord', icon: IconBrandDiscord },
] as const;

export function DropdownWithMicroInteractions() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <div
      className={cn(
        'Dropdown-with-micro-interactions--container flex flex-col gap-4 w-[320px] font-sans',
        showDropdown ? 'items-start' : 'items-center',
      )}>
      {showDropdown ? (
        <motion.input
          autoFocus
          onBlur={() => setShowDropdown(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowDropdown(false);
            }
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          type="text"
          className="text-sm bg-neutral-800/80 text-neutral-300 placeholder:text-neutral-400 font-normal px-3 py-2 w-[80%] rounded-lg focus-visible:outline-none"
          placeholder="Search for platforms"
        />
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setShowDropdown(true)}
          className={cn(
            'text-sm bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:brightness-110',
          )}>
          Search platforms
        </motion.button>
      )}
      {showDropdown && (
        <motion.div
          key="dropdown-container"
          className="rounded-2xl border border-neutral-900 w-full p-2 space-y-2 relative overflow-hidden">
          {PLATFORMS.map((platform, index) => {
            const { icon: PlatformIcon, name: platformName } = platform;
            return (
              <motion.button
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="Dropdown-option px-3 py-2 rounded-lg bg-neutral-900 text-neutral-300 flex items-center justify-start gap-2 text-sm w-full hover:brightness-110">
                <span className="Dropdown-option--icon-wrapper">
                  <PlatformIcon size={18} strokeWidth={1.5} />
                </span>
                <span className="Dropdown-option--name-wrapper">
                  {platformName}
                </span>
              </motion.button>
            );
          })}
          <motion.div
            className="w-[120px] h-[120px] rounded-full top-0 left-24 absolute bg-white/20 blur-3xl z-10"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 24, opacity: 0 }}
            transition={{ duration: 4, type: 'spring' }}
          />
        </motion.div>
      )}
    </div>
  );
}
