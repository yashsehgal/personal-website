import { InternalPostContainer } from '@/components/sections/internal-post-container';
import Image from 'next/image';

const PHOTOGRAPHY_IMAGES: { path: string; caption: string }[] = [
  { path: '1.JPG', caption: 'Disneyland, Hong Kong' },
  { path: '2.JPG', caption: 'Palace of Fine Arts, San Francisco, California' },
  {
    path: '3.JPG',
    caption:
      'Somewhere near to the Palace of Fine Arts, San Francisco, California',
  },
  { path: '4.JPG', caption: 'Palace of Fine Arts, San Francisco, California' },
  {
    path: '5.JPG',
    caption: 'Sunset at the Golden Gate Bridge, San Francisco, California',
  },
  {
    path: '6.JPG',
    caption: 'Golden Gate Bridge, San Francisco, California',
  },
  {
    path: '7.JPG',
    caption: 'Near to Alcatraz Island, San Francisco, California',
  },
  { path: '8.JPG', caption: 'A Boat Club, San Francisco, California' },
  {
    path: '9.JPG',
    caption: 'Petronas Twin Towers, Kuala Lumpur, Malaysia',
  },
  {
    path: '10.JPG',
    caption: 'Late-evening view of the Island, Hong Kong',
  },
];

export default function PhotographyPage() {
  return (
    <InternalPostContainer>
      <div className="grid grid-cols-1 gap-12 pb-12">
        {PHOTOGRAPHY_IMAGES.map((item, index) => (
          <div
            key={item.path}
            className="flex flex-col gap-4 items-center w-full">
            <Image
              src={`/photography/${item.path}`}
              alt={item.caption}
              width={1200}
              height={800}
              className="select-none pointer-events-none w-full h-full object-cover"
            />
            <p className="text-sm text-center font-medium">
              {`${index + 1}. ${item.caption}`}
            </p>
          </div>
        ))}
      </div>
    </InternalPostContainer>
  );
}
