'use client';
import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
const EMAIL_ADDRESS: string = 'yashsehgal@gmail.com' as const;

export default function Page() {
  const [isEmailAddressCopied, setIsEmailAddressCopied] =
    useState<boolean>(false);

  const handleCopyEmailAddress = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setIsEmailAddressCopied(true);
    setTimeout(() => {
      setIsEmailAddressCopied(false);
    }, 2000);
  };

  return (
    <div className="home-page space-y-8">
      <div className="space-y-4 w-2/5 max-xl:w-3/5 max-lg:w-full text-base text-secondary leading-7 max-md:text-wrap font-medium">
        {/* <p>
          I am a design engineer based out of India, who loves to create
          clean-looking and accessible interfaces. I use TypeScript and React to
          build UI and handle animations with Framer Motion.
        </p> */}
        <p>
          My recent work experience was at{' '}
          <Link
            href="https://stack.ai/"
            target="_blank"
            className="underline underline-offset-2 hover:text-foreground">
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
            className="underline underline-offset-2 hover:text-foreground">
            Rocketium
          </Link>{' '}
          as a design engineer and at{' '}
          <Link
            href="https://github.com/home"
            target="_blank"
            className="underline underline-offset-2 hover:text-foreground">
            GitHub
          </Link>{' '}
          as a frontend engineer.
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
