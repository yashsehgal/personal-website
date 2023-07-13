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
      projectTitle: "GitHub inspired landing page",
      projectData: {
        liveURL: "https://yashsehgal.github.io/github-landing/",
        githubURL: "https://github.com/yashsehgal/github-landing",
        relatedLinks: [
          {
            label: "Figma",
            link: "https://www.figma.com/file/iuLdt124KSHb20VQ7Z8kPM/GitHub-Assignment-(Landing-Page-Design)?type=design&mode=design&t=37ms2k7mq2WctrCh-0"
          }
        ]
      },
      description: [
        'Re-created github.com/home website using React and deployed it using GitHub Pages',
        'Before implementing, I have designed the website sections in Figma'
      ],
      tech: [
        'React',
        'TailwindCSS',
        'CSS',
        'GitHub Pages',
        'Figma'
      ],
      category: ['design'],
      status: 'Maintained'
    }
  ];

  return projects.reverse();
};
