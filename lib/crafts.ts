import { CraftProps } from '@/pages/crafts';

export const getCrafts = function (): CraftProps[] {
  return [
    {
      craftTitle: 'Button Component',
      craftDescription:
        'Beautiful Button Component with Typescript + React + TailwindCSS',
      linkType: 'internal',
      craftSlug: 'button-component',
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
