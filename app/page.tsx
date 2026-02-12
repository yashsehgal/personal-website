'use client';
import { ROUTES } from '@/common/route';
import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';
import { POST_ITEMS, PostItem } from '@/constants/post-items';
import { WORK_ITEMS, WorkItem } from '@/constants/work-items';
import { IconCheck } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MAX_POST_ITEMS_TO_SHOW: number = 4 as const;
const MAX_WORK_ITEMS_TO_SHOW: number = 3 as const;
const EMAIL_ADDRESS: string = 'yashsehgal@gmail.com' as const;

export default function Page() {
  const [isEmailAddressCopied, setIsEmailAddressCopied] =
    useState<boolean>(false);

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

  const handleCopyEmailAddress = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setIsEmailAddressCopied(true);
    setTimeout(() => {
      setIsEmailAddressCopied(false);
    }, 2000);
  };

  return (
    <div className="home-page space-y-8">
      <header className="flex items-center gap-4 justify-start">
        <h1 className="text-base font-semibold">Yash Sehgal</h1>
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.POSTS}
            className="text-secondary hover:text-foreground">
            Posts
          </Link>
          <Link
            href={ROUTES.ABOUT}
            className="text-secondary hover:text-foreground">
            About
          </Link>
        </div>
      </header>
      <div className="space-y-4 w-2/5 max-xl:w-3/5 max-lg:w-full text-base text-secondary leading-7 max-md:text-wrap">
        <p>
          I am a design engineer based out of India, who loves to create
          clean-looking and accessible interfaces. I use TypeScript and React to
          build UI and handle animations with Framer Motion.
        </p>
        <p>
          Me recent work experience was at{' '}
          <Link
            href="https://stack.ai/"
            target="_blank"
            className="underline underline-offset-2">
            StackAI
          </Link>
          , where I worked on the platform dashboard and the workflow builder.
          My focus was to improve the user experience and add a bunch of
          quality-of-life features. I joined the team as a founding design
          engineer.
        </p>
        <p>
          Before that, I worked at{' '}
          <Link
            href="https://rocketium.ai/"
            target="_blank"
            className="underline underline-offset-2">
            Rocketium
          </Link>{' '}
          as a design engineer on dashboard UX and AI chat components for a
          creative automation platform, and built their internal design system.
          Earlier, I was a frontend engineer at{' '}
          <Link
            href="https://github.com/home"
            target="_blank"
            className="underline underline-offset-2">
            GitHub
          </Link>{' '}
          on internal projects and marketing landing pages.
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <LinkButton
          variant="solid"
          href="mailto:yashsehgal@gmail.com"
          target="_blank">
          Write me an email
        </LinkButton>
        <Button
          variant="outline"
          onClick={handleCopyEmailAddress}
          className="gap-2">
          {isEmailAddressCopied ? (
            <IconCheck size={16} className="shrink-0" />
          ) : null}
          {isEmailAddressCopied
            ? 'Email address copied'
            : 'Copy my email address'}
        </Button>
      </div>
    </div>
  );
}
