const work = [
  {
    year: "2026",
    company: "Octolane",
    role: "Design Engineer",
    href: "https://octolane.com",
    mark: "M0 15 C 14 6, 24 19, 40 11 C 54 4, 66 17, 82 9 C 91 5, 96 14, 100 8",
  },
  {
    year: "2025",
    company: "StackAI",
    role: "Founding Design Engineer",
    href: "https://stack.ai",
    mark: "M0 8 C 12 16, 26 5, 42 13 C 58 21, 70 7, 86 15 C 93 18, 97 11, 100 14",
  },
  {
    year: "2024",
    company: "Rocketium",
    role: "Design Engineer",
    href: "https://rocketium.com",
    mark: "M0 12 C 16 13, 28 7, 46 14 C 62 20, 74 8, 88 13 C 94 16, 98 10, 100 12",
  },
  {
    year: "2023",
    company: "GitHub",
    role: "Engineering Intern",
    href: "https://github.com",
    mark: "M0 17 C 11 7, 24 19, 41 8 C 56 1, 69 17, 84 11 C 92 8, 97 15, 100 6",
  },
  {
    year: "2021",
    company: "Economize",
    role: "Engineering Intern",
    href: "https://www.linkedin.com/company/economize",
    mark: "M0 10 C 18 18, 32 5, 50 14 C 66 22, 78 8, 90 13 C 95 16, 98 9, 100 12",
  },
] as const;

const contentMarks = [
  {
    d: "M0 4 C 12 0, 24 7, 42 2 C 58 0, 72 6, 88 3 C 95 2, 100 5, 100 4 L 100 20 C 84 23, 66 17, 48 22 C 30 24, 14 18, 0 21 Z",
    y: "-0.2em",
    h: "1.36em",
    pad: "0.08em",
    duration: "200ms",
    opacity: 1,
  },
  {
    d: "M0 3 C 16 7, 28 0, 46 4 C 62 8, 76 1, 92 5 C 97 6, 100 3, 100 4 L 100 21 C 82 24, 64 18, 44 22 C 26 19, 12 23, 0 17 Z",
    y: "-0.24em",
    h: "1.42em",
    pad: "0.14em",
    duration: "230ms",
    opacity: 1,
  },
  {
    d: "M0 4 C 14 1, 26 8, 44 3 C 60 0, 74 7, 90 3 C 96 2, 100 5, 100 4 L 100 20 C 86 23, 68 18, 50 22 C 32 24, 16 19, 0 20 Z",
    y: "-0.16em",
    h: "1.32em",
    pad: "0.04em",
    duration: "180ms",
    opacity: 1,
  },
  {
    d: "M0 5 C 10 0, 22 8, 40 2 C 56 0, 70 7, 86 3 C 94 2, 100 6, 100 3 L 100 20 C 88 24, 70 17, 52 22 C 32 24, 14 19, 0 21 Z",
    y: "-0.22em",
    h: "1.4em",
    pad: "0.18em",
    duration: "220ms",
    opacity: 1,
  },
  {
    d: "M0 3 C 18 7, 32 0, 50 4 C 66 8, 80 1, 94 4 C 98 5, 100 2, 100 3 L 100 21 C 80 24, 62 18, 42 22 C 24 19, 10 23, 0 16 Z",
    y: "-0.18em",
    h: "1.34em",
    pad: "0.1em",
    duration: "190ms",
    opacity: 1,
  },
  {
    d: "M0 3 C 12 0, 24 7, 42 2 C 58 0, 72 6, 88 3 C 95 2, 100 5, 100 4 L 100 20 C 88 23, 70 18, 52 22 C 34 24, 16 19, 0 21 Z",
    y: "-0.22em",
    h: "1.4em",
    pad: "0.2em",
    duration: "210ms",
    opacity: 1,
  },
  {
    d: "M0 5 C 14 1, 28 8, 46 3 C 62 0, 76 7, 92 4 C 97 3, 100 6, 100 5 L 100 19 C 84 23, 64 17, 44 22 C 26 24, 12 18, 0 20 Z",
    y: "-0.2em",
    h: "1.36em",
    pad: "0.06em",
    duration: "240ms",
    opacity: 1,
  },
  {
    d: "M0 4 C 16 1, 30 8, 48 3 C 64 0, 78 7, 94 4 C 98 3, 100 6, 100 5 L 100 20 C 82 24, 64 18, 46 22 C 28 24, 12 19, 0 21 Z",
    y: "-0.24em",
    h: "1.42em",
    pad: "0.12em",
    duration: "170ms",
    opacity: 1,
  },
  {
    d: "M0 2 C 14 6, 28 0, 46 4 C 62 8, 76 1, 92 5 C 97 6, 100 3, 100 4 L 100 21 C 86 18, 68 23, 50 19 C 32 16, 14 22, 0 18 Z",
    y: "-0.26em",
    h: "1.44em",
    pad: "0.16em",
    duration: "200ms",
    opacity: 1,
  },
  {
    d: "M0 4 C 14 1, 28 7, 46 3 C 64 0, 78 6, 94 4 C 98 3, 100 5, 100 5 L 100 19 C 84 22, 66 17, 48 21 C 30 23, 14 18, 0 20 Z",
    y: "-0.22em",
    h: "1.38em",
    pad: "0.05em",
    duration: "220ms",
    opacity: 1,
  },
] as const;

function markImage(d: string, opacity: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" preserveAspectRatio="none"><path fill="#e2e2e2" fill-opacity="${opacity}" d="${d}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function ContentLink({
  href,
  children,
  mark,
  external = true,
}: {
  href: string;
  children: string;
  mark: number;
  external?: boolean;
}) {
  const stroke = contentMarks[mark];

  return (
    <a
      href={href}
      className="content-link"
      style={{
        "--mark-image": markImage(stroke.d, stroke.opacity),
        "--mark-y": stroke.y,
        "--mark-h": stroke.h,
        "--mark-pad": stroke.pad,
        "--mark-duration": stroke.duration,
      }}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <div className="max-w-[300px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <h1 className="text-base">Yash Sehgal</h1>
        <p className="text-muted">Design Engineer from Bombay</p>
      </header>
      <main>
        <p className="mb-4">
          Currently, I am working at{" "}
          <ContentLink href="https://octolane.com" mark={0}>
            Octolane
          </ContentLink>
          , where I help design a better AI-powered CRM and do a lot of the
          backend alongside the design.
        </p>
        <p className="mb-4">
          Previously, I was at{" "}
          <ContentLink href="https://stack.ai" mark={1}>
            StackAI
          </ContentLink>
          , where I led design engineering, joining as one of the founding team
          members. I focused on making it easier to create AI agents (
          <ContentLink
            href="https://www.stackai.com/platform/knowledge-bases"
            mark={2}
          >
            knowledge bases
          </ContentLink>
          ,{" "}
          <ContentLink
            href="https://www.stackai.com/changelog/08-20-2025"
            mark={3}
          >
            evaluators
          </ContentLink>
          ,{" "}
          <ContentLink href="https://www.stackai.com/platform/workflow" mark={4}>
            workflow for making agents
          </ContentLink>
          , and more areas within the platform)
        </p>
        <p className="mb-4">
          In my free time, I make music and play the keyboard, and I&apos;m
          learning sound engineering and composition. I read across a lot of
          subjects, and I love traveling and taking photographs.
        </p>
        <ul className="mb-4">
          {work.map((experience) => (
            <li key={experience.company}>
              <a
                href={experience.href}
                target="_blank"
                rel="noopener noreferrer"
                className="plain-link flex justify-between gap-4"
              >
                <span>
                  <span className="text-muted tabular-nums">
                    {experience.year} /{" "}
                  </span>
                  <span className="company">
                    <svg
                      viewBox="0 0 100 24"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d={experience.mark} />
                    </svg>
                    {experience.company}
                  </span>
                </span>
                <span className="shrink-0">{experience.role}</span>
              </a>
            </li>
          ))}
        </ul>
        <p>
          You can find me on{" "}
          <ContentLink href="https://x.com/yashsehgaldev" mark={5}>
            X
          </ContentLink>
          ,{" "}
          <ContentLink href="https://github.com/yashsehgal" mark={6}>
            GitHub
          </ContentLink>
          ,{" "}
          <ContentLink href="https://www.instagram.com/sehgalyash_/" mark={7}>
            Instagram
          </ContentLink>
          , or{" "}
          <ContentLink href="https://www.linkedin.com/in/sehgalyash/" mark={8}>
            LinkedIn
          </ContentLink>
          , or reach me via{" "}
          <ContentLink href="mailto:hi@yashsehgal.com" mark={9} external={false}>
            email
          </ContentLink>
          .
        </p>
      </main>
    </div>
  );
}
