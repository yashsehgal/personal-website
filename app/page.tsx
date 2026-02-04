import { ROUTES } from '@/common/route';
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
      <h1 className="text-2xl font-semibold tracking-tight ml-1.5">
        Hi, I am Yash
      </h1>
      <div className="flex flex-col items-start gap-8 ml-1.5">
        <p className="text-foreground text-base w-4/5 leading-7 max-lg:w-full">
          I am design engineer based out of India. My recent work experience
          includes designing dashboards, workflow builders, improving user
          experiences of different AI agent tools, and implementing design
          systems.
        </p>
        <p className="text-foreground text-base w-4/5 leading-7 max-lg:w-full">
          I focus on accessible, usable experiences, with a balanced layout,
          clear typography, and micro-interactions. I build UI with TypeScript
          and React and handle animations with framer-motion.
        </p>
      </div>
      <div className="grid grid-cols-2 items-start justify-start w-fit gap-24 max-lg:flex max-lg:flex-col max-xl:gap-12">
        <div className="post-container w-72 flex flex-col items-start gap-12">
          <LinkButton size="lg" href={ROUTES.POSTS}>
            Posts
          </LinkButton>
          <div className="post-list-container gap-8 flex items-start flex-col">
            {slicedPostItems.map((post, index) => {
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
          <LinkButton size="lg" href={ROUTES.WORK}>
            Work and projects
          </LinkButton>
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
