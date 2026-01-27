'use client';

import { LinkButton } from '@/components/link-button';
import { POST_ITEMS } from '@/constants/post-items';

export default function PostsPage() {
  return (
    <div className="post-page space-y-16 pt-16 max-lg:pt-0">
      <h1 className="text-xl font-semibold ml-1.5">
        Collection of my posts, designs and threads
      </h1>
      <div className="post-list-container grid grid-cols-2 items-start gap-12 w-4/5 max-xl:w-full max-xl:grid-cols-1">
        {POST_ITEMS.map((post, index) => {
          return (
            <div key={index} className="flex flex-col items-start gap-1">
              <LinkButton
                href={post.link}
                target={post.isInternal ? undefined : '_blank'}>
                {post.title}
              </LinkButton>
              <p className="font-medium text-secondary ml-1.5">
                {post.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
