'use client';
import { ROUTES } from '@/common/route';
import { SOCIALS } from '@/constants/socials';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/button';

const COPIED_TO_CLIPBOARD_MESSAGE_DURATION_MS: number = 1200 as const;

export function MainLayoutNavigation() {
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sounds/main.mp3');
    audio.preload = 'auto';
    audio.volume = 1;
    audio.load();
    clickSoundRef.current = audio;
  }, []);

  const playClickSound = () => {
    const audio = clickSoundRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const handleCopy = () => {
    setShowCopied(true);
    navigator.clipboard.writeText(SOCIALS.MAIL);
    setTimeout(() => {
      setShowCopied(false);
    }, COPIED_TO_CLIPBOARD_MESSAGE_DURATION_MS);
  };

  return (
    <header className="flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4">
        <Link href={ROUTES.HOME}>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="size-5 rounded-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 cursor-pointer"
            onClick={playClickSound}
          />
        </Link>
        <Button
          variant="outline"
          className="max-md:hidden w-42 flex items-center justify-center"
          onClick={handleCopy}>
          {showCopied ? (
            <motion.p
              key="copied-to-clipboard-message"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.25 }}>
              Email copied!
            </motion.p>
          ) : (
            <motion.p
              key="write-to-me-via-email"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.25 }}>
              Write to me via email
            </motion.p>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link
          href={SOCIALS.X}
          className="text-base font-medium text-secondary hover:text-foreground"
          target="_blank">
          X (Twitter)
        </Link>
        <Link
          href={SOCIALS.GITHUB}
          className="text-base font-medium text-secondary hover:text-foreground"
          target="_blank">
          GitHub
        </Link>
        <Link
          href={SOCIALS.LINKEDIN}
          className="text-base font-medium text-secondary hover:text-foreground"
          target="_blank">
          LinkedIn
        </Link>
      </div>
    </header>
  );
}
