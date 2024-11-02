import Link from 'next/link';
import React from 'react';

const SOCIALS: { name: string; link: string }[] = [
  { name: 'github', link: 'https://github.com/yashsehgal' },
  { name: 'x', link: 'https://x.com/yashsehgaldev' },
  { name: 'linkedin', link: 'https://linkedin.com/in/sehgalyash' },
  { name: 'substack', link: 'https://yashsehgal.substack.com/' },
  { name: 'mail', link: 'mailto:yashsehgal.work@gmail.com' },
];

export default function Header() {
  return (
    <header className="page-header space-y-1">
      <h1 className="text-xl font-medium tracking-tight">Yash Sehgal</h1>
      <p className="text-sm text-gray-500 tracking-tight">Design Engineer</p>
      <SocialsWrapper />
      <div className="!mt-8 text-sm">
        At present, I am working as a design engineer at{' '}
        <Link href="https://rocketium.com" target="_blank">
          rocketium
        </Link>
        . Building components and layouts for AI flows within the product.
        Including the internal design system.
      </div>
    </header>
  );
}

function SocialsWrapper() {
  return (
    <div className="flex gap-2 items-center my-2">
      {SOCIALS.map((social, index) => {
        return (
          <React.Fragment key={index}>
            <Link href={social.link} target="_blank" className="text-sm">
              {social.name}
            </Link>
            {index !== SOCIALS.length - 1 && (
              <span className="font-medium text-sm text-gray-300">/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
