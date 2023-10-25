import { ExperienceItemProps } from '@/components/main/ExperienceSection';

export const getExperiences = function (): ExperienceItemProps[] {
  return [
    // {
    //   experienceTitle: 'Frontend Engineering Intern',
    //   experienceDescription: [],
    //   experienceOrg: {
    //     name: 'Devfolio',
    //     link: 'https://devfolio.co',
    //     websiteDisplayName: 'devfolio.co',
    //   },
    //   experienceStatus: {
    //     startAt: 'Oct, 2023',
    //   },
    // },
    {
      experienceTitle: 'Software Engineering Intern',
      experienceDescription: [
        'Built a QR generator app for GiHub Internal Team usage. Used React for frontend & fastify for backend and APIs. Created the UI for the app on Figma using GitHub’s Primer design system. Integrated the QR generation with another internal URL shortener service for standardized QR generation. i.e. gh.io',
        'Worked on many UI designs and websites related to GitHub events & conferences with the DevRel engineering team.',
        'Worked with GitHub-actions & workflows for automating preview deployments, slack-integrations & project management.',
      ],
      experienceOrg: {
        name: 'GitHub',
        link: 'https://github.com',
        websiteDisplayName: 'github.com',
      },
      experienceStatus: {
        startAt: 'May, 2023',
        endAt: 'Sept, 2023',
      },
    },
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
