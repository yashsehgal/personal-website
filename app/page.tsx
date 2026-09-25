import { IMAGE_PLACEHOLDERS } from "@/common/image-placeholders";
import { WEBSITE_ROUTES } from "@/common/routes";
import { WORK_EXPERIENCES } from "@/common/work";
import { ProgressiveImage } from "@/components/progressive-image";
import Link from "next/link";

const textLinkClassName =
  "whitespace-nowrap rounded py-0.5 text-foreground hover:bg-muted focus-visible:bg-muted motion-reduce:transition-none";
const textLinkInsetClassName = `${textLinkClassName} -mx-1 px-1`;

const HOME_PHOTO_COLUMNS = [
  [
    {
      src: "/about/yash.jpg",
      width: 515,
      height: 772,
      alt: "Yash holding a camera on a boat, with the Golden Gate Bridge behind him",
    },
    {
      src: "/about/golden-gate.jpg",
      width: 1024,
      height: 682,
      alt: "Golden Gate Bridge at sunset from the beach",
    },
  ],
  [
    {
      src: "/about/marine-drive.jpg",
      width: 1024,
      height: 768,
      alt: "Mumbai skyline across the water at dusk",
    },
    {
      src: "/about/basketball-court.jpg",
      width: 682,
      height: 1024,
      alt: "Evening basketball game with the city skyline behind the court",
    },
  ],
] as const;

export default function Home() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6 px-1 wide:mt-16">
      <h1 className="font-medium tracking-tight">About</h1>
      <div className="flex w-full max-w-prose min-w-0 flex-col items-start gap-6">
        <div className="flex w-full min-w-0 flex-col items-start gap-6 leading-relaxed text-pretty text-muted-foreground tracking-tight">
        <p>
          Currently, I am working at{" "}
          <Link
            href="https://octolane.com"
            target="_blank"
            rel="noopener noreferrer"
            className={textLinkInsetClassName}
          >
            Octolane
          </Link>
          , where I help design a better AI-powered CRM and do a lot of the
          backend alongside the design. Previously, I was at{" "}
          <Link
            href="https://stack.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={textLinkInsetClassName}
          >
            StackAI
          </Link>
          , where I led design engineering, joining as one of the founding team
          members. I focused on making it easier to create AI agents (
          <Link
            href="https://www.stackai.com/platform/knowledge-bases"
            target="_blank"
            rel="noopener noreferrer"
            className={`${textLinkClassName} -mr-1 pr-1`}
          >
            knowledge bases
          </Link>
          ,{" "}
          <Link
            href="https://www.stackai.com/changelog/08-20-2025"
            target="_blank"
            rel="noopener noreferrer"
            className={textLinkInsetClassName}
          >
            evaluators
          </Link>
          ,{" "}
          <Link
            href="https://www.stackai.com/platform/workflow"
            target="_blank"
            rel="noopener noreferrer"
            className={textLinkInsetClassName}
          >
            workflow for making agents
          </Link>
          , and more areas within the platform)
        </p>
        <p>
          In my free time, I make music and play the keyboard, and I&apos;m
          learning sound engineering and composition. I read across a lot of
          subjects, and I love traveling and taking{" "}
          <Link href={WEBSITE_ROUTES.APPS_GALLERY} className={textLinkInsetClassName}>
            photographs
          </Link>
          .
        </p>
        </div>
        <ul className="-mx-1 mt-6 flex w-[calc(100%+0.5rem)] min-w-0 flex-col">
          {WORK_EXPERIENCES.map((experience, index) => {
            const showYear =
              index === 0 ||
              WORK_EXPERIENCES[index - 1].year !== experience.year;

            return (
              <li key={experience.id}>
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline justify-between gap-6 rounded px-1 py-0.5 text-sm tracking-tight text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
                >
                  <span className="min-w-0">
                    <span
                      className={
                        showYear ? "tabular-nums" : "invisible tabular-nums"
                      }
                      aria-hidden={showYear ? undefined : true}
                    >
                      {experience.year}
                    </span>
                    <span
                      aria-hidden="true"
                      className={showYear ? undefined : "invisible"}
                    >
                      {" / "}
                    </span>
                    <span className="text-foreground">{experience.company}</span>
                  </span>
                  <span className="shrink-0">{experience.role}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="grid w-full grid-cols-2 gap-3">
          {HOME_PHOTO_COLUMNS.map((column) => (
            <div key={column[0].src} className="flex flex-col gap-3">
              {column.map((photo) => {
                const placeholder = IMAGE_PLACEHOLDERS[photo.src];

                return (
                  <ProgressiveImage
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    width={placeholder.width}
                    height={placeholder.height}
                    blurDataURL={placeholder.blurDataURL}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Hi, I am Yash Sehgal. As of today, I am living in Bombay, India. I work as
      a design engineer with teams. You can read about my Recent Work Besides
      spending a lot of time on my computer, I love listening and discussing
      music. I sometimes play around with keyboards and sound production
      platforms. I find time for journaling in my day, sometimes I just write a
      single line, but I really enjoy writing about how I feel and things I am
      planning to do. I post some of them under My Writings
 */
