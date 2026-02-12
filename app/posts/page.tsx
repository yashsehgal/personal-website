'use client';

import { POST_ITEMS } from '@/constants/post-items';
import Link from 'next/link';

export default function PostsPage() {
  return (
    <div className="post-page space-y-8">
      <div className="grid grid-cols-1 divide-y divide-foreground/10 items-center justify-start border border-foreground/10 rounded-md">
        <div className="px-4 flex items-center justify-between w-full select-none cursor-default max-lg:py-2">
          <p className="text-base text-foreground py-2 max-lg:py-0">
            <span className="max-lg:hidden">Post</span>
            <span className="lg:hidden">All posts</span>
          </p>
          <p className="text-foreground w-3/5 text-wrap max-lg:hidden border-l border-foreground/10 pl-4 py-2 max-lg:border-none max-lg:p-0">
            Description
          </p>
        </div>
        {POST_ITEMS.map((post, index) => {
          return (
            <Link
              href={post.link}
              key={index}
              target={post.isInternal ? undefined : '_blank'}
              className="last:rounded-b-md overflow-hidden">
              <div className="px-4 flex items-stretch justify-between w-full group/post-item hover:bg-foreground/5 max-lg:flex-col max-lg:gap-2 max-lg:p-4">
                <p className="text-base font-medium text-foreground group-hover/post-item:text-foreground py-2 max-lg:p-0">
                  {post.title}
                </p>
                <p className="text-secondary w-3/5 text-wrap max-lg:w-full border-l border-foreground/10 pl-4 py-2 max-lg:border-none max-lg:p-0">
                  {post.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
