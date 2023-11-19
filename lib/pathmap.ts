import { PathMapProps } from '@/components/layout/Navbar';

export const getPathMap = function (): PathMapProps[] {
  return [
    {
      pathType: 'internal',
      title: 'home',
      link: '/',
      isAvailable: true,
    },
    {
      pathType: 'internal',
      title: 'blog',
      link: '/blog',
      isAvailable: true,
    },
    {
      pathType: 'internal',
      title: 'crafts',
      link: '/crafts',
      isAvailable: true,
    },
    {
      pathType: 'internal',
      title: 'newsletter 🌱',
      link: '/subscribe',
      isAvailable: true,
    },
    {
      pathType: 'internal',
      title: 'learnings',
      link: '/learnings',
      isAvailable: true,
    },
  ];
};
