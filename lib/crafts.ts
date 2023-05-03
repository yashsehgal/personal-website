import { CraftProps } from '@/pages/crafts';

export const getCrafts = function (): CraftProps[] {
  return [
    {
      craftTitle: 'Custom Command Palette',
      craftDescription: 'A custom command palette using Radix UI Primitives',
      linkType: 'internal',
      craftSlug: 'command-palette-using-radix-ui',
    },
    {
      craftTitle: 'Dropdown Component',
      craftDescription: 'An accessible dropdown component.',
      linkType: 'internal',
      craftSlug: 'dropdown-component',
    },
    {
      craftTitle: 'iOS type Time Slider',
      craftDescription: 'A simple and beautiful iOS Time Slider',
      linkType: 'internal',
      craftSlug: 'ios-time-slider',
    },
    {
      craftTitle: 'Button Component',
      craftDescription:
        'Beautiful Button Component with Typescript, React and TailwindCSS',
      linkType: 'internal',
      craftSlug: 'button-component',
    },
    {
      craftTitle: 'Avatar Component',
      craftDescription:
        'A customizable avatar component, built with Typescript, React and TailwindCSS',
      linkType: 'internal',
      craftSlug: 'avatar-component',
    },
    {
      craftTitle: 'Copy to Clipboard Action',
      craftDescription:
        'A basic way to create an action for implementing copy to clipboard action',
      linkType: 'internal',
      craftSlug: 'copy-to-clipboard-action',
    },
    {
      craftTitle: 'Accordion Component',
      craftDescription: 'Simple accordion component',
      linkType: 'internal',
      craftSlug: 'accordion-component',
    },
  ];
};

interface DateType {
  date?: number;
  month?: string;
  year: number;
}

interface HeaderPayloadType {
  playloadStatus?: boolean;
  header?: string;
  description?: string;
  uploadedAt?: DateType;
}

export const getCraftHeader = function ({
  craftSlug,
}: {
  craftSlug: string;
}): HeaderPayloadType {
  let headerPayload: HeaderPayloadType = {
    playloadStatus: false,
  };
  getCrafts()?.map((craft) => {
    if (craftSlug === `/crafts/${craft?.craftSlug}`) {
      headerPayload = {
        playloadStatus: true,
        header: craft?.craftTitle,
        description: craft?.craftDescription,
        uploadedAt: {
          month: 'Mar',
          year: 2023,
        },
      };
    }
  });

  return headerPayload;
};
