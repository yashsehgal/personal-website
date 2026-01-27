import { ROUTES } from '@/common/route';
import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';
import { POST_ITEMS, PostItem } from '@/constants/post-items';
import { IconArrowRight } from '@tabler/icons-react';

const MAX_POSTS_TO_SHOW: number = 4 as const;

export default function Page() {
  const slicedPosts: PostItem[] = POST_ITEMS.slice(0, MAX_POSTS_TO_SHOW);
  const showMorePosts: boolean = POST_ITEMS.length > MAX_POSTS_TO_SHOW;

  const remainingPosts: number = POST_ITEMS.length - slicedPosts.length;

  return (
    <div className="home-page space-y-16">
      <h1 className="text-2xl font-semibold ml-1.5">Hi, I am Yash</h1>
      <div className="grid grid-cols-2 items-start justify-start w-fit gap-12 max-lg:flex max-lg:flex-col">
        <div className="post-container w-72 flex flex-col items-start gap-12">
          <h2 className="text-xl font-semibold ml-1.5">Posts</h2>
          <div className="post-list-container gap-8 flex items-start flex-col">
            {slicedPosts.map((post, index) => {
              return (
                <div key={index} className="flex flex-col items-start gap-1">
                  <LinkButton href={post.link} target="_blank">
                    {post.title}
                  </LinkButton>
                  <p className="font-medium text-secondary ml-1.5">
                    {post.description}
                  </p>
                </div>
              );
            })}
            {showMorePosts && (
              <LinkButton href={ROUTES.POSTS} className="text-secondary">
                <span>
                  Show {remainingPosts} more{' '}
                  {remainingPosts > 1 ? 'posts' : 'post'}
                </span>
                <IconArrowRight size={16} />
              </LinkButton>
            )}
          </div>
        </div>
        <div className="articles-container">
          <h2 className="text-xl font-semibold pl-1.5">Work and projects</h2>
          <div className="work-and-projects-list-container"></div>
        </div>
      </div>
    </div>
  );
}
