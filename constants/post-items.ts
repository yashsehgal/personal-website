export interface PostItem {
  title: string;
  description: string;
  link: string;
}

export const POST_ITEMS: PostItem[] = [
  {
    title: 'Automation flow',
    description: 'Component design to show automated action logs',
    link: 'https://x.com/yashsehgaldev/status/1861593300823875738',
  },
  {
    title: 'Integrations',
    description:
      'Modern popup design with framer motion for showing apps to integrate',
    link: 'https://x.com/yashsehgaldev/status/1878349925114949835',
  },
  {
    title: 'Knowledge Base CTA',
    description:
      'A CTA card component to create a knowledge base with micro-interactions',
    link: 'https://x.com/yashsehgaldev/status/1872315527550669240',
  },
  {
    title: 'Dynamic Island',
    description: 'iOS-inspired dynamic island component',
    link: 'https://x.com/yashsehgaldev/status/1852582622528155984',
  },
  {
    title: 'Calendar and event widgets',
    description:
      'Widget components for meeting cards and calendar with details',
    link: 'https://x.com/yashsehgaldev/status/1898621497528467803',
  },
  {
    title: 'Floating call status component',
    description: '',
    link: 'https://x.com/yashsehgaldev/status/1887402029338997040',
  },
] as const;
