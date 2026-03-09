interface ProjectItem {
  title: string;
  description: string;
  link: string;
  draftMode: boolean;
  year: number;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Compile (Work in progress)',
    description: 'Personal and article writing platform',
    link: 'https://threads-app-ten-kohl.vercel.app/',
    draftMode: false,
    year: 2026,
  },
  {
    title: 'Cookies',
    description:
      'Built a small collection of cookies as in components including base components like Buttons, Toasts and pre-designed examples like Empty States, Cards and etc.',
    link: 'https://github.com/with-tw/cookies',
    draftMode: false,
    year: 2024,
  },
  {
    title: 'useGitHub()',
    description:
      'React hook for fetching activities and information via GitHub API',
    link: 'https://github.com/yashsehgal/use-github-react',
    draftMode: false,
    year: 2024,
  },
] as const;
