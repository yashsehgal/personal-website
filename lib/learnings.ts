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
    {
      videoURL:
        'https://drive.google.com/file/d/1lr5Ex3SB5qCaof_3ir7dRWBxpBhSWS8B/preview',
      details: {
        title: 'Cards | Design System UI Components',
        description:
          'Understanding how to build a custom card with additional stylings.',
      },
      category: ['design-system'],
    },
    {
      videoURL:
        'https://drive.google.com/file/d/1F7Jdetswf3rKlpbIr50vlLhsavAddWpq/preview',
      details: {
        title: 'My learnings about structuring a full-stack project',
        description:
          'Sharing my experience of managing folder structure in a full-stack application. Subjective to my learnings and experience ^^',
      },
    },
  ];

  return learnings.reverse();
};
