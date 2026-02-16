import { InternalPostContainer } from '@/components/sections/internal-post-container';
import Image from 'next/image';

const PHOTOGRAPHY_IMAGES: number = 10 as const;

const PHOTOGRAPHY_IMAGES_CAPTIONS: string[] = [
  'Disneyland, Hong Kong',
  'Palace of Fine Arts, San Francisco, California',
  'Somewhere near to the Palace of Fine Arts, San Francisco, California',
  'Palace of Fine Arts, San Francisco, California',
  'Sunset at the Golden Gate Bridge, San Francisco, California',
  'Golden Gate Bridge, San Francisco, California',
  'Near to Alcatraz Island, San Francisco, California',
  'A Boat Club, San Francisco, California',
  'Petronas Twin Towers, Kuala Lumpur, Malaysia',
  'Late-evening view of the Island, Hong Kong',
];

export default function PhotographyPage() {
  return (
    <InternalPostContainer>
      <div className="grid grid-cols-1 gap-12 pb-12">
        {Array.from({ length: PHOTOGRAPHY_IMAGES }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4 items-center w-full">
            <Image
              src={`/photography/${index + 1}.JPG`}
              alt={`Photography ${index + 1}`}
              width={1200}
              height={800}
              className="select-none pointer-events-none w-full h-full object-cover"
            />
            <p className="text-sm text-center font-medium">
              {`${index + 1}. ${PHOTOGRAPHY_IMAGES_CAPTIONS[index]}`}
            </p>
          </div>
        ))}
      </div>
    </InternalPostContainer>
  );
}
