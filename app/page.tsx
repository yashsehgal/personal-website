import { WEBSITE_ROUTES } from "@/common/routes";
import Link from "next/link";

const textLinkClassName =
  "-mx-1 whitespace-nowrap rounded px-1 py-0.5 text-foreground hover:bg-muted focus-visible:bg-muted motion-reduce:transition-none";

const adjacentMarkClassName =
  "group-hover:opacity-0 group-focus-within:opacity-0";

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-6">
      <h1 className="font-medium tracking-tight">About</h1>
      <div className="flex flex-col items-start gap-6 max-w-prose leading-relaxed text-pretty text-muted-foreground tracking-tight">
        <p>
          Most recently, I worked at{" "}
          <span className="group">
            <Link
              href="https://octolane.com"
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClassName}
            >
              Octolane
            </Link>
            <span className={adjacentMarkClassName}>,</span>
          </span>{" "}
          where I helped design a better AI-powered CRM and did a lot of the
          backend alongside the design. Before that, I was at{" "}
          <span className="group">
            <Link
              href="https://stack.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClassName}
            >
              StackAI
            </Link>
            <span className={adjacentMarkClassName}>,</span>
          </span>{" "}
          where I led design engineering, joining as one of the founding team
          members. I focused on making it easier to create AI agents{" "}
          <span className="group">
            <span className={adjacentMarkClassName}>(</span>
            <Link
              href="https://www.stackai.com/platform/knowledge-bases"
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClassName}
            >
              knowledge bases
            </Link>
            <span className={adjacentMarkClassName}>,</span>
          </span>{" "}
          <span className="group">
            <Link
              href="https://www.stackai.com/changelog/08-20-2025"
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClassName}
            >
              evaluators
            </Link>
            <span className={adjacentMarkClassName}>,</span>
          </span>{" "}
          <span className="group">
            <Link
              href="https://www.stackai.com/platform/workflow"
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClassName}
            >
              workflow for making agents
            </Link>
            <span className={adjacentMarkClassName}>,</span>
          </span>{" "}
          and more areas within the platform)
        </p>
        <p>
          In my free time, I make music and play the keyboard, and I&apos;m
          learning sound engineering and composition. I read across a lot of
          subjects, and I love traveling and taking{" "}
          <span className="group">
            <Link
              href={WEBSITE_ROUTES.PHOTOGRAPHY}
              className={textLinkClassName}
            >
              photographs
            </Link>
            <span className={adjacentMarkClassName}>.</span>
          </span>
        </p>
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
