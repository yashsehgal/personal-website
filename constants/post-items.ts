import { ROUTES } from '@/common/route';
import { getInternalPostData } from '@/constants/interal-posts';

export interface PostItem {
  title: string;
  description: string;
  link: string;
  isInternal?: boolean;
}

export const POST_ITEMS: PostItem[] = [
  {
    title:
      getInternalPostData(ROUTES.INTERNAL_POST_OPTICAL_SPACING)?.title ?? '',
    description:
      'Has an example of a hero section to explain the guidelines for better consistent and optical spacing.',
    link: ROUTES.INTERNAL_POST_OPTICAL_SPACING,
    isInternal: true,
  },
  {
    title: 'Automation flow',
    description: 'Component design to show automated action logs.',
    link: 'https://x.com/yashsehgaldev/status/1861593300823875738',
  },
  {
    title: 'Integrations',
    description:
      'Modern popup design with framer motion for showing apps to integrate.',
    link: 'https://x.com/yashsehgaldev/status/1878349925114949835',
  },
  {
    title: 'Knowledge Base CTA',
    description:
      'A CTA card component to create a knowledge base with micro-interactions.',
    link: 'https://x.com/yashsehgaldev/status/1872315527550669240',
  },
  {
    title: 'Dynamic Island',
    description: 'Made an iOS-inspired dynamic island component.',
    link: 'https://x.com/yashsehgaldev/status/1852582622528155984',
  },
  {
    title: 'Calendar and event widgets',
    description:
      'Widget components for meeting cards and calendar with details.',
    link: 'https://x.com/yashsehgaldev/status/1898621497528467803',
  },
  {
    title: 'Floating call status component',
    description:
      'Concept component for a floating widget showing an active call status with actions.',
    link: 'https://x.com/yashsehgaldev/status/1887402029338997040',
  },
  {
    title: 'LLM Tools in StackAI',
    description:
      'Made this component to improve the LLM tool addition and creation UX when I was working at StackAI.',
    link: 'https://x.com/yashsehgaldev/status/1976250373339021719',
  },
  {
    title: 'Book recommendations',
    description: 'List of books I read in the year 2025 in various genres.',
    link: 'https://x.com/yashsehgaldev/status/2006262558446285044',
  },
] as const;
