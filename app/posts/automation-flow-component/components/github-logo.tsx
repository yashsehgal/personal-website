import Image from 'next/image';
import { JSX } from 'react';

export function GitHubLogo(): JSX.Element {
  return (
    <div className="p-2 rounded-full bg-white w-8 h-8">
      <Image
        src="/assets/github-logo.png"
        alt="github-logo"
        className="w-full h-full"
        width={80}
        height={80}
      />
    </div>
  );
}
