import { LinkButton } from '@/components/link-button';
import { ART_ITEMS } from '@/constants/art-items';

export default function ArtPage() {
  return (
    <div className="art-page space-y-16 pt-32 max-lg:pt-0">
      <h1 className="text-xl font-semibold ml-1.5">Art work</h1>
      <div className="art-list-container grid grid-cols-2 items-start gap-12 w-5/6 max-xl:w-full max-xl:grid-cols-1">
        {ART_ITEMS.map((art, index) => {
          return (
            <div key={index} className="flex flex-col items-start gap-1">
              <LinkButton href={art.link} target="_blank">
                {art.title}
              </LinkButton>
              <p className="font-medium text-secondary ml-1.5">
                {art.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
