import { ROUTES } from '@/common/route';
import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';
import { POST_ITEMS, PostItem } from '@/constants/post-items';
import { WORK_ITEMS, WorkItem } from '@/constants/work-items';
import { IconArrowRight } from '@tabler/icons-react';

const MAX_POST_ITEMS_TO_SHOW: number = 4 as const;
const MAX_WORK_ITEMS_TO_SHOW: number = 3 as const;

export default function Page() {
  const slicedPostItems: PostItem[] = POST_ITEMS.slice(
    0,
    MAX_POST_ITEMS_TO_SHOW,
  );
  const showMorePostItems: boolean = POST_ITEMS.length > MAX_POST_ITEMS_TO_SHOW;
  const remainingPostItems: number = POST_ITEMS.length - slicedPostItems.length;

  const slicedWorkItems: WorkItem[] = WORK_ITEMS.slice(
    0,
    MAX_WORK_ITEMS_TO_SHOW,
  );
  const showMoreWorkItems: boolean = WORK_ITEMS.length > MAX_WORK_ITEMS_TO_SHOW;
  const remainingWorkItems: number = WORK_ITEMS.length - slicedWorkItems.length;

  return (
    <div className="home-page space-y-16">
      <h1 className="text-2xl font-semibold ml-1.5">Hi, I am Yash</h1>
      <div className="grid grid-cols-2 items-start justify-start w-fit gap-12 max-lg:flex max-lg:flex-col">
        <div className="post-container w-72 flex flex-col items-start gap-12">
          <h2 className="text-xl font-semibold ml-1.5">Posts</h2>
          <div className="post-list-container gap-8 flex items-start flex-col">
            {slicedPostItems.map((post, index) => {
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
            {showMorePostItems && (
              <LinkButton href={ROUTES.POSTS} className="text-secondary">
                <span>
                  Show {remainingPostItems} more{' '}
                  {remainingPostItems > 1 ? 'posts' : 'post'}
                </span>
                <IconArrowRight size={16} />
              </LinkButton>
            )}
          </div>
        </div>
        <div className="work-and-projects--container w-72 flex flex-col items-start gap-12">
          <h2 className="text-xl font-semibold ml-1.5">Work and projects</h2>
          <div className="work-and-projects-list-container gap-8 flex items-start flex-col">
            {slicedWorkItems.map((work, index) => {
              return (
                <div key={index} className="flex flex-col items-start gap-1">
                  <LinkButton href={work.link} target="_blank">
                    {work.title}
                  </LinkButton>
                  <p className="font-medium text-secondary ml-1.5">
                    {work.description}
                  </p>
                </div>
              );
            })}
            {showMoreWorkItems && (
              <LinkButton href={ROUTES.WORK} className="text-secondary">
                <span>
                  Show {remainingWorkItems} more{' '}
                  {remainingWorkItems > 1 ? 'experiences' : 'experience'}
                </span>
                <IconArrowRight size={16} />
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
