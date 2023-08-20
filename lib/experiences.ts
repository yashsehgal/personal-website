import { ExperienceItemProps } from '@/components/main/ExperienceSection';

export const getExperiences = function (): ExperienceItemProps[] {
  return [
    {
      experienceTitle: 'frontend software engineer',
      experienceDescription: [
        'Building a complete platform for buying/purchasing digital asset indexes and managing your crypto portfolio.',
        'Using Javascript, React, NextJS, TailwindCSS for building frontend and UI. Using Figma to design layouts and design system.',
      ],
      experienceOrg: {
        name: 'Clamp',
        link: 'https://joinclamp.com',
        websiteDisplayName: 'joinclamp.com',
      },
      experienceStatus: {
        startAt: 'Jan, 2023',
        endAt: 'April, 2023',
      },
    },
    {
      experienceTitle: 'Product Design Contributor',
      experienceDescription: [
        'Started contributing as a design contributor and contributed to AsyncAPI website project using ReactJS and TailwindCSS.',
        'Working on auditing existing components created using TailwindCSS support; Fixed UX for components, improved layouts for upcoming features.',
        'Tools I work with during contribution: Figma, Git/GitHub, Slack, Netlify, Storybook, React, TailwindCSS, NextJS, Javascript.',
      ],
      experienceOrg: {
        name: 'AsyncAPI Initiative',
        link: 'https://asyncapi.com',
        websiteDisplayName: 'asyncapi.com',
      },
      experienceStatus: {
        startAt: 'Jan, 2022',
        endAt: 'Sept 2022',
      },
    },
    {
      experienceTitle: 'Software Engineering Internship',
      experienceDescription: [
        'Worked on the a dashboard application frontend using VueJS, SCSS and re-vamping the components of the same.',
        'Builded a complete design system for all the applications using VueJS and SCSS.',
        'Learned about tools and technologies such as GoLang, Redis and AWS.',
      ],
      experienceOrg: {
        name: 'Economize.cloud',
        link: 'https://economize.cloud',
        websiteDisplayName: 'economize.cloud',
      },
      experienceStatus: {
        startAt: 'July, 2021',
        endAt: 'Dec, 2021',
      },
    },
  ];
};
