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
      link: '/craft',
      isAvailable: false,
    },
  ];
};
