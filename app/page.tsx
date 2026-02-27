'use client';

import { POST_ITEMS } from '@/constants/post-items';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WORK_EXPERIENCE } from '@/constants/work-experience';
import { WRITING_ITEMS } from '@/constants/writing-items';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

enum TABS {
  WORK_EXPERIENCE = 'work-experience',
  POSTS = 'posts',
  WRITING = 'writing',
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TABS>(TABS.POSTS);

  const handleTabChange = (tab: TABS) => {
    setActiveTab(tab);
  };

  return (
    <div className="home-page space-y-16">
      <header className="flex items-center gap-4">
        <h1 className="text-5xl font-medium w-2/3 text-balance leading-14 tracking-tighter font-mono max-lg:w-full max-md:text-3xl max-md:leading-10">
          Hi, I am Yash. I help companies build clean and easy to use
          interfaces.
        </h1>
      </header>
      <div
        aria-description="Recent-work-experience"
        className="space-y-8 my-24">
        <h2 className="font-semibold">Recent Work Experience</h2>
        <p className="text-secondary leading-7 w-2/3 max-lg:w-full">
          My most recent role was at{' '}
          <Image
            src="/company/stackai-logo.png"
            alt="stackai-logo"
            width={100}
            height={100}
            className="size-4 object-contain inline mb-1 ml-0.5 dark:invert"
            priority
          />{' '}
          <span className="text-foreground font-medium">StackAI</span> where I
          worked as a Founding Design Engineer. I led the redesign of the
          product&apos;s overall experience, including the agent workflow
          builder - a core tool that enables users to create and manage agent
          workflows.
        </p>
      </div>
      <div className="flex items-center gap-12 justify-start max-md:gap-6">
        <button
          className={cn(
            'text-base font-semibold cursor-pointer max-md:text-sm',
            activeTab === TABS.POSTS
              ? 'text-foreground'
              : 'text-secondary/80 hover:text-secondary',
          )}
          onClick={() => handleTabChange(TABS.POSTS)}>
          Posts <span className="max-sm:hidden">({POST_ITEMS.length})</span>
        </button>
        <button
          className={cn(
            'text-base font-semibold cursor-pointer max-md:text-sm',
            activeTab === TABS.WORK_EXPERIENCE
              ? 'text-foreground'
              : 'text-secondary/80 hover:text-secondary',
          )}
          onClick={() => handleTabChange(TABS.WORK_EXPERIENCE)}>
          Work experience{' '}
          <span className="max-sm:hidden">({WORK_EXPERIENCE.length})</span>
        </button>
        <button
          className={cn(
            'text-base font-semibold cursor-pointer max-md:text-sm',
            activeTab === TABS.WRITING
              ? 'text-foreground'
              : 'text-secondary/80 hover:text-secondary',
          )}
          onClick={() => handleTabChange(TABS.WRITING)}>
          Writings{' '}
          <span className="max-sm:hidden">({WRITING_ITEMS.length})</span>
        </button>
      </div>
      {activeTab === TABS.WORK_EXPERIENCE ? (
        <div aria-description="Work portfolio" className="space-y-8">
          <div className="grid grid-cols-1 divide-y divide-foreground/10">
            {WORK_EXPERIENCE.map((work, index) => {
              return (
                <Link
                  key={index}
                  href={work.companyWebsite}
                  target="_blank"
                  className="block py-2 group/work-item">
                  <div className="flex items-center justify-between text-sm font-medium truncate gap-4">
                    <p className="text-foreground group-hover/work-item:text-foreground/50 truncate">
                      {work.companyName}
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <p className="font-mono text-foreground/40 uppercase tracking-wide shrink-0">
                        {work.role} / {work.year}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
      {activeTab === TABS.POSTS ? (
        <main aria-description="Posts" className="space-y-8">
          <div className="grid grid-cols-1 divide-y divide-foreground/10">
            {POST_ITEMS.map((post, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.02 * (index + 1),
                    type: 'spring',
                    bounce: 0,
                    ease: 'easeOut',
                  }}>
                  <Link
                    href={post.link}
                    target={post.isInternal ? '_self' : '_blank'}
                    className="block py-2 group/post-item">
                    <div className="flex items-center justify-between text-sm font-medium truncate gap-4">
                      <p className="text-foreground group-hover/post-item:text-foreground/50 truncate">
                        {post.title}
                      </p>
                      <div>
                        <p className="font-mono text-foreground/40 uppercase tracking-wide shrink-0">
                          {post.tag} / {post.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </main>
      ) : null}
      {activeTab === TABS.WRITING ? (
        <div aria-description="Writing" className="space-y-8">
          <div className="grid grid-cols-1 divide-y divide-foreground/10">
            {WRITING_ITEMS.map((writing, index) => {
              return (
                <Link
                  key={index}
                  href={writing.draftMode ? '#' : writing.path}
                  className={cn(
                    'block py-2 group/writing-item',
                    writing.draftMode
                      ? 'opacity-50 pointer-events-none select-none'
                      : '',
                  )}>
                  <div className="flex items-center justify-between text-sm font-medium truncate gap-4">
                    <p
                      className={cn(
                        'text-foreground truncate',
                        !writing.draftMode
                          ? 'group-hover/writing-item:text-foreground/50'
                          : '',
                      )}>
                      {writing.title}
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <p className="font-mono text-foreground/40 uppercase tracking-wide shrink-0">
                        {writing.draftMode ? 'Draft' : writing.year}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
