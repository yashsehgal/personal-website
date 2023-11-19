import { LearningItemProps } from '@/pages/learnings';

export const getLearnings = function (): LearningItemProps[] {
  const learnings: LearningItemProps[] = [
    {
      videoURL:
        'https://drive.google.com/file/d/1WD4HvdeKSGI5Zm3_wSz1LJ5CuLPlZSkH/preview',
      details: {
        title: 'Buttons | Design System UI Components',
        description:
          'Understanding the foundations of React and Typescript for building a custom button component with variants and icon support.',
      },
      category: ['design-system'],
    },
  ];

  return learnings.reverse();
};
