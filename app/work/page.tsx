'use client';

import { LinkButton } from '@/components/link-button';
import { WORK_ITEMS } from '@/constants/work-items';

export default function WorkPage() {
  return (
    <div className="work-page space-y-16 pt-8 max-lg:pt-0">
      <h1 className="text-xl font-semibold ml-1.5">Work and projects</h1>
      <div className="work-list-container grid grid-cols-2 items-start gap-12 w-4/5 max-xl:w-full max-xl:grid-cols-1">
        {WORK_ITEMS.map((work, index) => {
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
      </div>
    </div>
  );
}
