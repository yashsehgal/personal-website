import { Button } from '@/components/button';
import { SOCIALS } from '@/constants/socials';
import {
  IconBrandGithubFilled,
  IconBrandX,
  IconCheck,
  IconCopy,
  IconMail,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export function OpenForWorkWidget() {
  const [showCopied, setShowCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SOCIALS.MAIL);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  return (
    <div className="open-for-work-widget space-y-12 flex flex-col items-center justify-center mt-24 w-full">
      <div className="w-56 h-px bg-foreground/10" />
      <div className="bg-background w-full divide-y border border-foreground/10 rounded-2xl overflow-hidden">
        <div className="p-6 flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-start">
          <div className="space-y-1">
            <div className="flex items-center justify-start gap-2.5">
              <div className="size-4 flex items-center justify-center bg-foreground/15 rounded-full animate-pulse ease-in-out">
                <div className="size-2 rounded-full bg-foreground/30" />
              </div>
              <p className="text-base font-medium max-lg:text-sm mb-0.5">
                I am currently open for work
              </p>
            </div>
            <p className="text-base text-secondary max-lg:text-sm">
              Let&apos;s connect if you like my work and want to hire a design
              engineer.
            </p>
          </div>
          <Link
            href="mailto:yashsehgal.work@gmail.com"
            target="_blank"
            className="rounded-full max-lg:w-full max-md:justify-center p-4 py-2 border border-foreground/10 shadow-2xs text-background bg-foreground text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
            <IconMail size={16} />
            <span>Write me a mail</span>
          </Link>
        </div>
        <div className="p-6 flex items-center justify-between gap-3 max-lg:justify-start bg-foreground/2">
          <div className="flex items-center justify-start gap-3">
            <Link
              href={SOCIALS.X}
              className="rounded-full size-8 border border-foreground/10 shadow-2xs text-foreground bg-background flex items-center justify-center cursor-pointer">
              <IconBrandX size={16} />
            </Link>
            <Link
              href={SOCIALS.GITHUB}
              className="rounded-full size-8 border border-foreground/10 shadow-2xs text-foreground bg-background flex items-center justify-center cursor-pointer">
              <IconBrandGithubFilled size={16} />
            </Link>
          </div>
          <button
            onClick={handleCopy}
            className="rounded-full h-8 border border-foreground/10 shadow-2xs text-foreground bg-background flex items-center justify-center cursor-pointer text-xs gap-1.5 px-3 font-medium w-56
          max-lg:flex-1">
            {showCopied ? (
              <motion.p
                key="copied-text"
                className="text-xs font-medium flex items-center justify-start gap-1.5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.25 }}>
                <IconCheck size={12} />
                Copied to clipboard
              </motion.p>
            ) : (
              <motion.div
                key="email-container"
                className="flex items-center justify-start gap-1.5"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.25 }}>
                <IconCopy size={12} className="mt-0.5" />
                <span>yashsehgal.work@gmail.com</span>
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
