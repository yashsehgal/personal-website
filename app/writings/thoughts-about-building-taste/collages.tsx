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
    </figure>
  );
}

export function TypographyCollage() {
  return (
    <figure className="flex w-full items-start px-1">
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
    </figure>
  );
}

export function BrandingCollage() {
  return (
    <figure className="relative w-full px-1 pb-[38%] sm:pb-[34%]">
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
    </figure>
  );
}
