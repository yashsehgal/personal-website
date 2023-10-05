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
      projectTitle: 'BeAlright',
      projectData: {
        liveURL: 'https://bealright.in',
        relatedLinks: [
          {
            label: 'Twitter Post',
            link: 'https://twitter.com/yashsehgaldev/status/1700511788826234913',
          },
        ],
      },
      description: [
        'The app has to make its users feel connected, synced, and cared, without any distractions by checking chat notifications. All by iOS & Android Widgets 🍕',
        "This is design-first project, right now I am working on it's design system",
      ],
      tech: ['Figma', 'React', 'TailwindCSS'],
      category: ['design', 'design-system', 'ui/ux'],
      status: 'Ongoing',
    },
    {
      projectTitle: 'PrepMeUp',
      projectData: {
        liveURL: 'https://prepmeup.vercel.app/',
        relatedLinks: [
          {
            label: 'GitHub',
            link: 'https://github.com/yashsehgal/prepmeup',
          },
        ],
      },
      description: [
        'PrepMeUp is an AI-powered interview preparation platform. Undergrad minor project 🍕',
      ],
      tech: ['NextJS', 'TailwindCSS', 'Typescript', 'OpenAI', 'GPT Models'],
      category: ['ui/ux', 'full-stack'],
      status: 'Ongoing',
    },
  ];

  return projects.reverse();
};
