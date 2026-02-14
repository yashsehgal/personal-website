'use client';

import { POST_ITEMS } from '@/constants/post-items';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WORK_EXPERIENCE } from '@/constants/work-experience';

export default function Page() {
  return (
    <div className="home-page space-y-16">
      <header className="flex items-center gap-4">
        <h1 className="text-5xl font-medium w-2/3 text-balance leading-14 tracking-tighter font-mono max-lg:w-full max-md:text-3xl max-md:leading-10">
          Hi, I am Yash. I help companies build clean and easy to use
          interfaces.
        </h1>
      </header>
      <div aria-description="Work portfolio" className="space-y-8">
        <h2 className="text-base font-semibold">
          Work experience ({WORK_EXPERIENCE.length})
        </h2>
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
      <main aria-description="Posts" className="space-y-8">
        <h2 className="text-base font-semibold">Posts ({POST_ITEMS.length})</h2>
        <div className="grid grid-cols-1 divide-y divide-foreground/10">
          {POST_ITEMS.map((post, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, filter: 'blur(2px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: 0.04 * (index + 1),
                  type: 'spring',
                  bounce: 0,
                  duration: 0.5,
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
    </div>
  );
}
