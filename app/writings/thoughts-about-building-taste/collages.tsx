import { cn } from "cn";
import Image, { type StaticImageData } from "next/image";
import appleMusicDemo from "./images/apple-music-demo.png";
import brandNewArchive from "./images/brand-new-archive.png";
import brandTacoma from "./images/brand-tacoma.png";
import goldenGooseBag from "./images/golden-goose-bag.png";
import goldenGooseShoes from "./images/golden-goose-shoes.png";
import goldenGooseStore from "./images/golden-goose-store.jpg";
import goldenGooseTable from "./images/golden-goose-table.jpg";
import jobsDylan from "./images/jobs-dylan.png";
import jobsListening from "./images/jobs-listening.png";
import reversoBlue from "./images/reverso-blue.jpg";
import reversoOpen from "./images/reverso-open.jpg";
import seiko from "./images/seiko.png";
import tudorOyster from "./images/tudor-oyster.jpg";
import typeCalifornia from "./images/type-california.png";
import typeStamp from "./images/type-stamp.png";
import typeBlob from "./images/type-blob.png";
import typeFtFont from "./images/type-ftfont.png";
import typeAllover from "./images/type-allover.png";
import watchBlueprint from "./images/watch-blueprint.png";
import watchRolexCaliber from "./images/watch-rolex-caliber.jpg";
import watchSpecs from "./images/watch-specs.png";
import nikeV5 from "./images/nike-v5.jpg";
import nikeSwoosh from "./images/nike-swoosh.jpg";
import nikeTravis from "./images/nike-travis.png";
import nikeCortez from "./images/nike-cortez.jpg";

const frameClassName =
  "overflow-hidden rounded-lg bg-background shadow-md ring-1 ring-foreground/10";

function PlacedPhoto({
  src,
  alt,
  className,
  imageClassName,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
}) {
  return (
    <div className={cn("relative", frameClassName, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}

function Print({
  src,
  alt,
  className,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  sizes: string;
}) {
  return (
    <div className={cn(frameClassName, className)}>
      <Image src={src} alt={alt} sizes={sizes} className="h-auto w-full" />
    </div>
  );
}

const halfSizes = "(min-width: 64rem) 22rem, 46vw";
const plateSizes = "(min-width: 64rem) 48rem, 100vw";

function FigureCaption({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <figcaption
      className={cn(
        "col-span-2 mt-3 w-full text-center font-serif text-sm italic leading-normal text-pretty text-muted-foreground",
        className,
      )}
    >
      {children}
    </figcaption>
  );
}

export function ArticlePhoto({
  src,
  alt,
  caption,
}: {
  src: StaticImageData;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="flex w-full flex-col items-center px-1">
      <div className={cn(frameClassName, "w-fit max-w-full")}>
        <Image
          src={src}
          alt={alt}
          sizes={plateSizes}
          className="h-auto max-h-[40rem] w-auto max-w-full"
        />
      </div>
      <FigureCaption>{caption}</FigureCaption>
    </figure>
  );
}

export const articlePhotos = {
  typeBlob: {
    src: typeBlob,
    alt: "A specimen of soft, uneven display letters, with the alphabet, numbers, and punctuation",
    caption: "A soft, uneven display alphabet.",
  },
  typeFtFont: {
    src: typeFtFont,
    alt: "White display capitals with uneven heights and cut edges, set on a deep blue field",
    caption: "Cut-edge capitals on a flat blue field.",
  },
  typeAllover: {
    src: typeAllover,
    alt: "Overlapping exhibition posters where names, dates, and Korean type stack into a dense field",
    caption: "Names and dates stacked until the type is the picture.",
  },
  watchBlueprint: {
    src: watchBlueprint,
    alt: "A watch engineering drawing with case, side, caseback, and bracelet dimensions",
    caption: "Case, side, and bracelet, drawn to size.",
  },
  watchRolexCaliber: {
    src: watchRolexCaliber,
    alt: "An exploded drawing of a Rolex caliber, with gears, screws, and the dial",
    caption: "A Rolex caliber taken apart, down to the dial.",
  },
  watchSpecs: {
    src: watchSpecs,
    alt: "A spec sheet of watch parts, each with weight, material, and grade beside a rendering",
    caption: "Each part, with its weight, material, and grade.",
  },
  nikeV5: {
    src: nikeV5,
    alt: "An illustrated Nike poster of a chunky runner, with a short story about the shoe beside it",
    caption: "A Nike runner, drawn with a short story beside it.",
  },
  nikeSwoosh: {
    src: nikeSwoosh,
    alt: "An orange poster built around one large Swoosh and the line It only goes one way",
    caption: "One Swoosh, and one sentence.",
  },
  nikeTravis: {
    src: nikeTravis,
    alt: "An ink drawing of a Travis Scott Jordan, with notes, a shoe box, and the soles around it",
    caption: "A Travis Scott Jordan, drawn with the box and the soles.",
  },
  nikeCortez: {
    src: nikeCortez,
    alt: "A Nike Cortez poster with a performer on stage and the line I do this for the culture",
    caption: "A stage, a line of type, and the Cortez.",
  },
} as const;

export function JobsCollage() {
  return (
    <figure className="w-full px-1">
      <div className="ml-[8%] w-[92%] -rotate-1">
        <Print
          src={jobsDylan}
          alt="Steve Jobs on stage beside the Bob Dylan Highway 61 Revisited cover during an Apple presentation"
          sizes="(min-width: 64rem) 44rem, 92vw"
        />
      </div>
      <div className="relative z-10 mt-[-18%] flex items-end justify-between gap-3 sm:mt-[-22%]">
        <Print
          src={jobsListening}
          alt="Steve Jobs in a car, wearing headphones and holding an iPod"
          sizes="(min-width: 64rem) 16rem, 36vw"
          className="w-[38%] rotate-1 sm:w-[34%]"
        />
        <Print
          src={appleMusicDemo}
          alt="An iTunes window with Black Eyed Peas album art across the top and a playlist below"
          sizes="(min-width: 64rem) 26rem, 56vw"
          className="w-[58%] -rotate-1"
        />
      </div>
      <FigureCaption>Jobs, a Dylan cover, and an Apple Music demo.</FigureCaption>
    </figure>
  );
}

export function GoldenGooseCollage() {
  return (
    <figure className="grid w-full grid-cols-2 items-start gap-x-3 px-1 sm:gap-x-4">
      <PlacedPhoto
        src={goldenGooseStore}
        alt="Inside a Golden Goose store, a wooden bench with a sewing machine, spools of thread, and cubbies of shoes"
        sizes={halfSizes}
        imageClassName="object-[center_42%]"
        className="z-10 aspect-3/4 w-full -rotate-1"
      />
      <PlacedPhoto
        src={goldenGooseShoes}
        alt="A grid of Golden Goose sneakers in worn leather, each with a star on the side"
        sizes={halfSizes}
        imageClassName="object-top"
        className="mt-8 aspect-3/4 w-[94%] justify-self-end rotate-1 sm:mt-12"
      />
      <PlacedPhoto
        src={goldenGooseTable}
        alt="Overhead view of a Golden Goose work table, with shoes, paint, and people customizing by hand"
        sizes={halfSizes}
        className="z-10 -mt-6 aspect-3/4 w-[94%] rotate-1 sm:-mt-10"
      />
      <PlacedPhoto
        src={goldenGooseBag}
        alt="Golden Goose sneakers resting on a dust bag that reads For dream use only"
        sizes={halfSizes}
        imageClassName="object-[center_58%]"
        className="z-20 -mt-12 aspect-3/4 w-full justify-self-end -rotate-1 sm:-mt-16"
      />
      <FigureCaption className="mt-8 sm:mt-10">
        The store, the shoes, the work table, and the dust bag.
      </FigureCaption>
    </figure>
  );
}

export function WatchesCollage() {
  return (
    <figure className="grid w-full grid-cols-2 items-start gap-x-3 px-1 sm:gap-x-4">
      <PlacedPhoto
        src={reversoOpen}
        alt="A Jaeger-LeCoultre Reverso with the case flipped open, showing the steel back"
        sizes={halfSizes}
        className="z-10 aspect-4/5 w-[96%] -rotate-1"
      />
      <PlacedPhoto
        src={reversoBlue}
        alt="A Jaeger-LeCoultre Reverso with a blue dial, applied indices, and a navy strap"
        sizes={halfSizes}
        className="mt-8 aspect-square w-[96%] justify-self-end rotate-1 sm:mt-10"
      />
      <PlacedPhoto
        src={tudorOyster}
        alt="A Tudor Oyster Prince with a black dial and applied indices on a textured strap"
        sizes={halfSizes}
        imageClassName="object-[center_40%]"
        className="z-10 -mt-4 aspect-4/5 w-[90%] rotate-1 sm:-mt-8"
      />
      <PlacedPhoto
        src={seiko}
        alt="A Seiko on a metal bracelet, held in the hand, with a black dial and thick stick indices"
        sizes={halfSizes}
        imageClassName="object-[center_42%]"
        className="-mt-10 aspect-4/5 w-[92%] justify-self-end -rotate-1 sm:-mt-14"
      />
      <FigureCaption className="mt-8 sm:mt-10">
        A Reverso, a Tudor, and a Seiko.
      </FigureCaption>
    </figure>
  );
}

export function TypographyCollage() {
  return (
    <figure className="flex w-full flex-col px-1">
      <div className="flex items-start">
        <Print
          src={typeCalifornia}
          alt="A type specimen of the word California, set in six weights from black to light"
          sizes="(min-width: 64rem) 26rem, 58vw"
          className="w-[58%] -rotate-1"
        />
        <Print
          src={typeStamp}
          alt="A rubber-stamp type specimen showing an alphabet and weights from thin to heavy"
          sizes="(min-width: 64rem) 22rem, 50vw"
          className="z-10 mt-[14%] ml-[-8%] w-[50%] rotate-1"
        />
      </div>
      <FigureCaption>California, from a heavy weight down to a thin stamp.</FigureCaption>
    </figure>
  );
}

export function BrandingCollage() {
  return (
    <figure className="w-full px-1">
      <div className="relative pb-[38%] sm:pb-[34%]">
        <Print
          src={brandNewArchive}
          alt="White type on blue cloth reading New Archive, Brooklyn, New York, 2018"
          sizes="(min-width: 64rem) 40rem, 86vw"
          className="w-[86%] -rotate-1"
        />
        <Print
          src={brandTacoma}
          alt="A Tacoma sticker with a mountain illustration and a serif wordmark"
          sizes="(min-width: 64rem) 18rem, 42vw"
          className="absolute right-1 bottom-0 z-10 w-[44%] rotate-2 sm:w-[40%]"
        />
      </div>
      <FigureCaption>New Archive on cloth, and a Tacoma mountain.</FigureCaption>
    </figure>
  );
}
