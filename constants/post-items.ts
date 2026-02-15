import { ROUTES } from '@/common/route';
import { getInternalPostData } from '@/constants/interal-posts';

enum POST_TAGS {
  COMPONENT = 'DESIGN',
  ARTICLE = 'ARTICLE',
  MUSIC = 'MUSIC',
}

export interface PostItem {
  title: string;
  description: string;
  link: string;
  isInternal?: boolean;
  tag: POST_TAGS;
  year: number;
}

export const POST_ITEMS: PostItem[] = [
  {
    title: 'User avatar micro interaction widget',
    description: 'A widget  to show a user avatar with a micro interaction',
    link: ROUTES.INTERNAL_POST_USER_AVATAR_MICRO_INTERACTION_WIDGET,
    isInternal: true,
    tag: POST_TAGS.COMPONENT,
    year: 2026,
  },
  // 2026
  {
    title: getInternalPostData(ROUTES.INTERNAL_POST_LOGS)?.title ?? '',
    description:
      'A card component to show project activity with a metadata card',
    link: ROUTES.INTERNAL_POST_LOGS,
    isInternal: true,
    tag: POST_TAGS.COMPONENT,
    year: 2026,
  },
  {
    title:
      getInternalPostData(ROUTES.INTERNAL_POST_BREADCRUMB_COMPONENT)?.title ??
      '',
    description:
      'Sidebar and breadcrumb navigation sync using query params; tree auto-expands for the current page.',
    link: ROUTES.INTERNAL_POST_BREADCRUMB_COMPONENT,
    isInternal: true,
    tag: POST_TAGS.ARTICLE,
    year: 2026,
  },
  {
    title:
      getInternalPostData(ROUTES.INTERNAL_POST_OPTICAL_SPACING)?.title ?? '',
    description:
      'Has an example of a hero section to explain the guidelines for better consistent and optical spacing',
    link: ROUTES.INTERNAL_POST_OPTICAL_SPACING,
    isInternal: true,
    tag: POST_TAGS.ARTICLE,
    year: 2026,
  },
  {
    title: 'Background score: Kingdom Introduction',
    description:
      'Epic themed score. Instruments used: String Ensemble, French Horns, Trombones, Harp, Taiko Drums',
    link: 'https://x.com/yashsehgaldev/status/2013026621897523684',
    tag: POST_TAGS.MUSIC,
    year: 2026,
  },
  // 2025
  {
    title: 'Automation flow',
    description: 'Component design to show automated action logs',
    link: 'https://x.com/yashsehgaldev/status/1861593300823875738',
    tag: POST_TAGS.COMPONENT,
    year: 2025,
  },
  {
    title: 'Integrations',
    description:
      'Modern popup design with framer motion for showing apps to integrate',
    link: 'https://x.com/yashsehgaldev/status/1878349925114949835',
    tag: POST_TAGS.COMPONENT,
    year: 2025,
  },
  {
    title: 'Calendar and event widgets',
    description:
      'Widget components for meeting cards and calendar with details',
    link: 'https://x.com/yashsehgaldev/status/1898621497528467803',
    tag: POST_TAGS.COMPONENT,
    year: 2025,
  },
  {
    title: 'Floating call status component',
    description:
      'Concept component for a floating widget showing an active call status with actions',
    link: 'https://x.com/yashsehgaldev/status/1887402029338997040',
    tag: POST_TAGS.COMPONENT,
    year: 2025,
  },
  {
    title: 'LLM Tools in StackAI',
    description:
      'Made this component to improve the LLM tool addition and creation UX when I was working at StackAI',
    link: 'https://x.com/yashsehgaldev/status/1976250373339021719',
    tag: POST_TAGS.COMPONENT,
    year: 2025,
  },
  {
    title: 'Book recommendations',
    description: 'List of books I read in the year 2025 in various genres',
    link: 'https://x.com/yashsehgaldev/status/2006262558446285044',
    tag: POST_TAGS.ARTICLE,
    year: 2025,
  },
  // 2024
  {
    title: 'Knowledge Base CTA',
    description:
      'A CTA card component to create a knowledge base with micro-interactions',
    link: 'https://x.com/yashsehgaldev/status/1872315527550669240',
    tag: POST_TAGS.COMPONENT,
    year: 2024,
  },
  {
    title: 'Dynamic Island',
    description: 'Made an iOS-inspired dynamic island component',
    link: 'https://x.com/yashsehgaldev/status/1852582622528155984',
    tag: POST_TAGS.COMPONENT,
    year: 2024,
  },
  {
    title: 'Cookies',
    description:
      'Built a small collection of cookies as in components including base components like Buttons, Toasts and pre-designed examples like Empty States, Cards and etc.',
    link: 'https://github.com/with-tw/cookies',
    tag: POST_TAGS.COMPONENT,
    year: 2024,
  },
  {
    title: 'useGitHub()',
    description:
      'React hook for fetching activities and information via GitHub API',
    link: 'https://github.com/yashsehgal/use-github-react',
    tag: POST_TAGS.COMPONENT,
    year: 2024,
  },
  {
    title: 'VSCode-like editor layout',
    description:
      'A VSCode-like editor layout with a sidebar and a main content area',
    link: 'https://x.com/yashsehgaldev/status/1845536318211916102',
    tag: POST_TAGS.ARTICLE,
    year: 2024,
  },
  {
    title: 'Query-based content selection using window.getSelection()',
    description:
      'A tool to select and copy content from a page based on a query',
    link: 'https://x.com/yashsehgaldev/status/1776016441860321399',
    tag: POST_TAGS.ARTICLE,
    year: 2024,
  },
] as const;
