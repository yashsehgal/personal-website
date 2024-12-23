'use client';
import { GlobalContext } from '@/context/global-context';
import Link from 'next/link';
import React, { useContext } from 'react';

const SOCIALS: { name: string; link: string }[] = [
  { name: 'GitHub', link: 'https://github.com/yashsehgal' },
  { name: 'X', link: 'https://x.com/yashsehgaldev' },
  { name: 'LinkedIn', link: 'https://linkedin.com/in/sehgalyash' },
  { name: 'Substack', link: 'https://yashsehgal.substack.com/' },
  { name: 'Mail', link: 'mailto:yashsehgal.work@gmail.com' },
  { name: 'Discussions', link: '/discussions' },
];

export default function Header() {
  return (
    <header className="page-header space-y-1">
      <h1 className="text-xl font-medium tracking-tight">Yash Sehgal</h1>
      <p className="text-sm text-gray-500 tracking-tight">Design Engineer</p>
      <SocialsWrapper />
      <div className="!mt-8 text-sm">
        My recent experience was working as a frontend/design engineer at{' '}
        <Link href="https://rocketium.com" target="_blank">
          Rocketium
        </Link>
        . Building components and layouts for AI flows within the product.
        Including the internal design system. Also, worked with{' '}
        <Link href="https://github.com/home" target="_blank">
          GitHub
        </Link>{' '}
        as an frontend engineering intern. Worked on internal tools and landing
        pages with APAC and Latin region DevRel team.
      </div>
    </header>
  );
}

function SocialsWrapper() {
  const { discussionCount } = useContext(GlobalContext);
  return (
    <div className="flex gap-2 items-center my-2">
      {SOCIALS.map((social, index) => {
        return (
          <React.Fragment key={index}>
            <Link
              href={social.link}
              target={social.name === 'Discussions' ? '_self' : '_blank'}
              className="text-sm">
              {social.name}
            </Link>
            {!!discussionCount &&
              social.name.toLowerCase() === 'discussions' && (
                <p className="discussionCount-badge text-xs font-medium px-1.5 py-0.5 rounded bg-gray-200">
                  {discussionCount}
                </p>
              )}
            {index !== SOCIALS.length - 1 && (
              <span className="font-medium text-sm text-gray-300">/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
