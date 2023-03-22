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
        'Figma'
      ],
      category: ["ui/ux"],
      status: "Maintained"
    },
    {
        projectTitle: "Aria Design System",
        projectData: {
            githubURL: "https://github.com/yashsehgal/aria",
            relatedLinks: [
                {
                    label: "Figma",
                    link: "https://www.figma.com/file/VrU8n3Oiu7gLHhN3acbQJL/Aria-(Design-System)?node-id=0%3A1&t=BxMDKgeQrfiKSF8p-1"
                }
            ],
        },
        tech: ['React', 'Typescript', 'Figma', 'TailwindCSS', 'HTML', 'Storybook'],
        category: ["design-system"],
        status: "Ongoing"
    }
  ];

  return projects.reverse();
};
