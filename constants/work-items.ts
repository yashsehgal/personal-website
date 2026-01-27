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
] as const;
