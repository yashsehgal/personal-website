'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LinkButton } from '@/components/link-button';
import { ROUTES } from '@/common/route';
import {
  IconBrandGithub,
  IconBrandX,
  IconMail,
  IconMusic,
} from '@tabler/icons-react';

const PROFILE_IMAGE_URL: string = '/yash.jpg' as const;

const SOCIAL_LINKS = {
  X: 'https://x.com/yashsehgaldev',
  GITHUB: 'https://github.com/yashsehgal',
  LINKEDIN: 'https://www.linkedin.com/in/sehgalyash/',
  INSTAGRAM: 'https://www.instagram.com/sehgalyash_/',
  EMAIL: 'mailto:yashsehgal.work@gmail.com',
} as const;

export default function AboutPage() {
  return (
    <div className="about-page space-y-16 pt-8 max-lg:pt-0">
      <h1 className="text-xl font-semibold ml-1.5">Hi,</h1>
      <motion.div
        key="profile-image-container"
        initial={{ filter: 'blur(6px)', opacity: 0.1 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
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
          className="size-42 object-cover object-center ml-1.5 pointer-events-none cursor-default select-none"
        />
      </motion.div>
      <div className="space-y-6">
        <p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6">
          I am design engineer based out of India. My recent work experience
          includes designing dashboards, workflow builders, improving user
          experiences of different AI agent tools, and implementing design
          systems.
        </p>
        <p className="text-foreground font-medium text-2xl w-4/5 leading-9 text-balance max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6">
          I focus on accessible, usable experiences, with a balanced layout,
          clear typography, and micro-interactions. I build UI with TypeScript
          and React and handle animations with framer-motion.
        </p>
        <p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6">
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
        </p>
        {/* DESKTOP VIEW SOCIAL LINKS */}
        <div className="space-y-4 max-xl:hidden mt-24">
          <p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6 inline-flex items-center gap-1">
            To find me on socials, I share about my work{' '}
            <LinkButton
              href={SOCIAL_LINKS.X}
              target="_blank"
              className="font-medium inline-flex items-center gap-1 text-2xl text-secondary max-lg:text-lg max-md:text-sm">
              <IconBrandX
                size={24}
                className="shrink-0 max-lg:size-4 max-md:size-4"
              />
              @yashsehgaldev
            </LinkButton>
          </p>
          <p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6 inline-flex items-center gap-1">
            See my
            <LinkButton
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              className="font-medium inline-flex items-center gap-1 text-2xl text-secondary max-lg:text-lg max-md:text-sm">
              <IconBrandGithub
                size={24}
                className="shrink-0 max-lg:size-4 max-md:size-4"
              />
              @yashsehgal
            </LinkButton>{' '}
            to see my contributions and work.
          </p>
          <p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6 inline-flex items-center gap-1">
            Write me at{' '}
            <LinkButton
              href={SOCIAL_LINKS.EMAIL}
              target="_blank"
              className="font-medium inline-flex items-center gap-1 text-2xl text-secondary max-lg:text-lg max-md:text-sm">
              <IconMail
                size={24}
                className="shrink-0 max-lg:size-4 max-md:size-4"
              />
              yashsehgal.work@gmail.com
            </LinkButton>
          </p>
        </div>
        {/* MOBILE VIEW SOCIAL LINKS */}
        <div className="space-y-4 xl:hidden">
          <p className="text-foreground font-medium text-2xl w-4/5 leading-9 max-lg:text-lg max-md:text-base max-lg:leading-8 max-md:leading-6">
            My socials
          </p>
          <div className="flex flex-col items-start gap-2">
            <LinkButton
              href={SOCIAL_LINKS.X}
              target="_blank"
              className="font-medium inline-flex items-center gap-1 text-2xl text-secondary max-lg:text-lg max-md:text-sm">
              <IconBrandX
                size={24}
                className="shrink-0 max-lg:size-4 max-md:size-4"
              />
              @yashsehgaldev
            </LinkButton>
            <LinkButton
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              className="font-medium inline-flex items-center gap-1 text-2xl text-secondary max-lg:text-lg max-md:text-sm">
              <IconBrandGithub
                size={24}
                className="shrink-0 max-lg:size-4 max-md:size-4"
              />
              @yashsehgal
            </LinkButton>
            <LinkButton
              href={SOCIAL_LINKS.EMAIL}
              target="_blank"
              className="font-medium inline-flex items-center gap-1 text-2xl text-secondary max-lg:text-lg max-md:text-sm">
              <IconMail
                size={24}
                className="shrink-0 max-lg:size-4 max-md:size-4"
              />
              yashsehgal.work@gmail.com
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
