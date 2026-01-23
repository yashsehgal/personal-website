import { POSTS } from '@/common/navigation';
import Link from 'next/link';

export default function PostsPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="font-medium">Posts</h1>
      <div className="text-balance">
        <ol className="leading-7">
          {POSTS.map((post, index) => {
            return (
              <li key={index} className="list-decimal list-inside font-medium">
                <Link
                  href={post.route}
                  target={post.isExternal ? '_blank' : undefined}
                  className="clean-link">
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
