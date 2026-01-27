export interface WorkItem {
  title: string;
  description: string;
  link: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    title: 'StackAI',
    description:
      'Worked on the platform dashboard and workflow builder, focused on user-experience and a bunch of quality-of-life features. Joined the team as a founding design engineer.',
    link: 'https://stack.ai/',
  },
  {
    title: 'Cookies',
    description:
      'Built a small collection of cookies as in components including base components like Buttons, Toasts and pre-designed examples like Empty States, Cards and etc.',
    link: 'https://github.com/with-tw/cookies',
  },
  {
    title: 'Rocketium',
    description:
      'Worked on the dashboard user experience for a creative automation platform. Implemented components like dynamic islands, widgets and tools for the in-built AI chat assistant. Along with this, I built the internal design system and design guidelines.',
    link: 'https://rocketium.ai/',
  },
  {
    title: 'useGitHub()',
    description:
      'React hook for fetching activities and information via GitHub API',
    link: 'https://github.com/yashsehgal/use-github-react',
  },
  {
    title: 'GitHub',
    description:
      'During my internship, I worked on several internal projects with some landing pages for marketing.',
    link: 'https://github.com/yashsehgal',
  },
] as const;
