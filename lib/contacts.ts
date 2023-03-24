import { ContactItemProps } from '@/components/main/ContactSection';

export const getContacts = function (): ContactItemProps[] {
  return [
    {
      title: 'GitHub',
      link: {
        display: '@yashsehgal',
        url: 'https://github.com/yashsehgal',
      },
    },
    {
      title: 'Twitter',
      link: {
        display: '@yashsehgaldev',
        url: 'https://twitter.com/yashsehgaldev',
      },
    },
    {
      title: 'LinkedIn',
      link: {
        display: 'linkedin.com/in/sehgalyash',
        url: 'https://linkedin.com/in/sehgalyash',
      },
    },
    {
      title: 'Instagram',
      link: {
        display: '@sehgalyash_',
        url: 'https://instagram.com/sehgalyash_',
      },
    },
    {
      title: 'Schedule a meeting',
      link: {
        display: 'cal.com/yashsehgal',
        url: 'https://cal.com/yashsehgal',
      },
    },
    {
      title: 'Resume',
      link: {
        display: 'yashsehgal.com/resume',
        url: '/resume',
      },
    },
  ];
};
