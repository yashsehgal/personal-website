'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LinkButton } from '@/components/link-button';
import { ROUTES } from '@/common/route';
import { IconMusic } from '@tabler/icons-react';

const PROFILE_IMAGE_URL: string = '/yash.jpg' as const;

export default function AboutPage() {
  return (
    <div className="about-page space-y-16">
      <h1 className="text-xl font-semibold ml-1.5">Hi,</h1>
      <div className="size-42">
        <motion.div
          key="profile-image-container"
          className="size-42 overflow-hidden"
          initial={{ filter: 'blur(8px)', opacity: 0.1, y: 24, height: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0, height: 'auto' }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: 'spring',
            bounce: 0,
            ease: 'easeInOut',
          }}>
          <Image
            src={PROFILE_IMAGE_URL}
            alt="Profile image"
            width={600}
            height={600}
            priority
            className="size-42 object-cover object-center ml-1.5 pointer-events-none cursor-default select-none"
          />
        </motion.div>
      </div>
      <div className="space-y-6 ml-1.5">
        <motion.p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6">
          I am design engineer based out of India. My recent work experience
          includes designing dashboards, workflow builders, improving user
          experiences of different AI agent tools, and implementing design
          systems.
        </motion.p>
        <motion.p className="text-foreground font-medium text-2xl w-4/5 leading-9 text-balance max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6">
          I focus on accessible, usable experiences, with a balanced layout,
          clear typography, and micro-interactions. I build UI with TypeScript
          and React and handle animations with framer-motion.
        </motion.p>
        <motion.p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6">
          Besides work, I love listening to music and playing and making music.
          I play piano and make background scores for storylines in my free
          time.
          <LinkButton
            href={ROUTES.ART}
            className="font-medium inline-flex items-center gap-1 text-2xl text-secondary max-lg:text-lg max-md:text-sm">
            See my art work{' '}
            <IconMusic
              size={24}
              className="shrink-0 max-lg:size-4 max-md:size-4"
            />
          </LinkButton>
        </motion.p>
      </div>
    </div>
  );
}
