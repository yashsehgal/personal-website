'use client';

import { POST_ITEMS } from '@/constants/post-items';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="home-page space-y-16">
      <header className="flex items-center gap-4">
        <h1 className="text-lg font-medium">I am Yash – Design Engineer</h1>
      </header>
      <main aria-description="Posts" className="space-y-8">
        <div>
          <h2 className="text-sm font-medium">Posts ({POST_ITEMS.length})</h2>
        </div>
        <div className="grid grid-cols-1 divide-y divide-foreground/10">
          {POST_ITEMS.map((post, index) => {
            return (
              <Link
                href={post.link}
                target={post.isInternal ? '_self' : '_blank'}
                key={index}
                className="block py-2 group/post-item">
                <div className="flex items-center justify-between text-sm font-medium">
                  <p className="text-foreground group-hover/post-item:text-foreground/50">
                    {post.title}
                  </p>
                  <div>
                    <p className="font-mono text-foreground/40 uppercase tracking-wide">
                      {post.tag} / {post.year}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
