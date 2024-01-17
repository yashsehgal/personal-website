import { ProjectItemProps } from '@/components/main/ProjectSection';

export const getProjects = function (): ProjectItemProps[] {
  let projects: ProjectItemProps[] = [
    {
      projectTitle: 'HEKORS Community Website',
      projectData: {
        liveURL: 'https://hekors.vercel.app',
        githubURL: 'https://github.com/hekors/website',
        relatedLinks: [
          {
            label: 'Figma',
            link: 'https://www.figma.com/file/jW2MWJ0uw6rjRHJgyyKNjv/HEKORS-Website-UI?node-id=1%3A2&t=KNpN3CUgsSSaeNem-1',
          },
        ],
      },
      description: [
        'Managing a complete website project for HEKORS Community; Created using React, NextJS, TailwindCSS, RadixUI, Typescript.',
        'Building complete database using Strapi CMS',
      ],
      tech: [
        'NextJS',
        'React',
        'TailwindCSS',
        'StrapiCMS',
        'Heroku',
        'Typescript',
        'Figma',
      ],
      category: ['ui/ux'],
      status: 'Maintained',
    },
    {
      projectTitle: 'GitHub inspired landing page',
      projectData: {
        liveURL: 'https://yashsehgal.github.io/github-landing/',
        githubURL: 'https://github.com/yashsehgal/github-landing',
        relatedLinks: [
          {
            label: 'Figma',
            link: 'https://www.figma.com/file/iuLdt124KSHb20VQ7Z8kPM/GitHub-Assignment-(Landing-Page-Design)?type=design&mode=design&t=37ms2k7mq2WctrCh-0',
          },
        ],
      },
      description: [
        'Re-created github.com/home website using React and deployed it using GitHub Pages',
        'Before implementing, I have designed the website sections in Figma',
      ],
      tech: ['React', 'TailwindCSS', 'CSS', 'GitHub Pages', 'Figma'],
      category: ['design'],
      status: 'Maintained',
    },
    {
      projectTitle: "Basefolio",
      projectData: {
        githubURL: "https://github.com/yashsehgal/basefolio",
      },
      description: [
        'Building all the internal services, APIs and middleware using NextJS and Typescript.',
        'Technology Used: NextJS, Tailwind, Typescript, Strapi CMS, Web Cookies',
        'The platform carries hackathon experience for both participants and organizers'
      ],
      tech: ['NextJS', 'Strapi CMS', 'TailwindCSS', 'Typescript'],
      category: ['full-stack'],
      status: 'Open Source',
    },
    {
      projectTitle: 'Communal',
      projectData: {
        githubURL: 'https://github.com/communal/communalapp',
        liveURL: 'https://communalapp-test.vercel.app/',
        relatedLinks: [
          {
            label: 'Craftbook NPM',
            link: 'https://npmjs.com/package/craftbook',
          },
          {
            label: 'Craftbook GitHub',
            link: 'https://github.com/Communal/craftbook/'
          },
        ],
      },
      description: [
        'Building a community management + social app using NextJS, Tailwind, Typescript.',
        'Building craftbook -- a specific UI kit and component library for Communal-based components',
        'Using Clerk for auth, Supabase as a DB, Resend for generating mails and web-technologies like Typescript, NextJS server components to build the frontend.',
        'Using Storybook and ViteJS to build the component package'
      ],
      tech: ['NextJS', 'Typescript', 'Clerk Auth', 'Supabase', 'Resend', 'NPM', 'Vite', 'Javascript', 'Server components', 'Storybook'],
      status: 'Ongoing',
      category: ['full-stack', 'design-system']
    }
  ];

  return projects.reverse();
};
