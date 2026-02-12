'use client';

import { POST_ITEMS } from '@/constants/post-items';
import Link from 'next/link';

export default function PostsPage() {
  return (
    <div className="post-page space-y-8">
      <div className="grid grid-cols-1 divide-y divide-foreground/10 items-center justify-start border border-foreground/10 rounded-md">
        <div className="py-2 px-4 flex items-center justify-between w-full bg-foreground/2 select-none cursor-default">
          <p className="text-base text-foreground">
            <span className="max-lg:hidden">Title</span>
            <span className="lg:hidden">All posts</span>
          </p>
          <p className="text-foreground w-3/5 text-wrap max-lg:hidden">
            Description
          </p>
        </div>
        {POST_ITEMS.map((post, index) => {
          return (
            <Link
              href={post.link}
              key={index}
              target={post.isInternal ? undefined : '_blank'}
              className="last:rounded-b-lg overflow-hidden">
              <div className="py-2 px-4 flex items-start justify-between w-full group/post-item hover:bg-foreground/5 max-lg:flex-col max-lg:gap-2 max-lg:p-4">
                <p className="text-base font-medium text-foreground group-hover/post-item:text-foreground">
                  {post.title}
                </p>
                <p className="text-secondary w-3/5 text-wrap max-lg:w-full">
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
