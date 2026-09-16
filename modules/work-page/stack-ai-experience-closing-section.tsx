import { cn } from "cn";
import Image from "next/image";

const GALLERY = [
  {
    src: "/work/stack-ai/gallery/golden-gate.jpeg",
    alt: "Golden Gate Bridge at dusk",
    width: 4096,
    height: 2731,
    className: "col-span-2 aspect-3/2",
    sizes: "(max-width: 42rem) 100vw, 28rem",
  },
  {
    src: "/work/stack-ai/gallery/office-road.jpeg",
    alt: "Street outside the office in San Francisco",
    width: 2457,
    height: 3276,
    className: "max-md:col-span-2 max-md:aspect-3/2 md:row-span-2 md:min-h-0",
    sizes: "(max-width: 48rem) 100vw, 14rem",
  },
  {
    src: "/work/stack-ai/gallery/full-team-picture.jpeg",
    alt: "StackAI team on a boat near the Golden Gate Bridge",
    width: 2048,
    height: 1365,
    className: "aspect-3/2",
    sizes: "(max-width: 48rem) 50vw, 14rem",
  },
  {
    src: "/work/stack-ai/gallery/team-picture.jpeg",
    alt: "StackAI teammates standing together in a park",
    width: 1024,
    height: 635,
    className: "aspect-3/2",
    sizes: "(max-width: 48rem) 50vw, 14rem",
  },
] as const;

export function StackAiExperienceClosingSection() {
  return (
    <section
      aria-label="A year with the team"
      className="flex flex-col gap-6 font-sans text-sm font-medium leading-relaxed text-muted-foreground/70"
    >
      <p>
        I had a really good year. I visited SF twice for team retreats, enjoyed
        working on the projects, went out with the team, and got to meet
        everyone in person.
      </p>
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-3">
        {GALLERY.map((photo) => (
          <li
            key={photo.src}
            className={cn("relative overflow-hidden rounded-md", photo.className)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={photo.sizes}
              draggable={false}
              className="object-cover outline -outline-offset-1 outline-oklch(0_0_0/0.1) dark:outline-oklch(1_0_0/0.1)"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
