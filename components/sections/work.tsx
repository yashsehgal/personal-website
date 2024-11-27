'use client';
import { IconBriefcase2 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const WORK_EXPERIENCE: {
  name: string;
  description: string;
  link: string;
  status: string;
}[] = [
  {
    name: 'rightfit',
    description: 'Co-founder',
    link: 'https://rightfit.so',
    status: 'present',
  },
  {
    name: 'Rocketium',
    description: 'Frontend Design Engineer',
    link: 'https://rocketium.com',
    status: '2024, 8 months',
  },
  {
    name: 'GitHub',
    description: 'Frontend Engineering Intern (DevRel team)',
    link: 'https://github.com',
    status: '2023, 5 months',
  },
  {
    name: 'economize.cloud',
    description: 'Frontend Engineering Intern',
    link: 'https://economize.cloud',
    status: '2021, 6 months',
  },
];

export default function Work() {
  return (
    <section className="work space-y-3">
      <h2 className="text-sm font-semibold">work</h2>
      <ul className="work-list space-y-2">
        {WORK_EXPERIENCE.map((experience, index) => {
          return <Experience {...experience} key={index} />;
        })}
      </ul>
    </section>
  );
}

function Experience(experience: {
  name: string;
  description: string;
  link: string;
  status: string;
}) {
  const [showStatus, setShowStatus] = useState<boolean>(false);
  return (
    <li
      className="work-item"
      onMouseEnter={() => setShowStatus(true)}
      onMouseLeave={() => setShowStatus(false)}>
      <div className="work-item-content space-y-1">
        <div className="flex items-center gap-2">
          <Link href={experience.link} className="font-semibold text-sm">
            {experience.name}
          </Link>
          {showStatus && (
            <p className="text-xs text-gray-500">- {experience.status}</p>
          )}
        </div>
        <p className="text-sm flex items-center gap-1">
          <IconBriefcase2 size={14} strokeWidth={2} />
          <span>{experience.description}</span>
        </p>
      </div>
    </li>
  );
}
