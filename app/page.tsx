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
    d: "M0 12 C 12 6, 24 17, 42 10 C 58 4, 72 15, 88 9 C 95 7, 100 11, 100 13 L 100 18 C 84 22, 66 16, 48 20 C 30 23, 14 17, 0 19 Z",
    y: "0.06em",
    h: "0.86em",
    pad: "0.08em",
    duration: "200ms",
    opacity: 0.84,
  },
  {
    d: "M0 9 C 16 15, 28 6, 46 13 C 62 19, 76 8, 92 14 C 97 16, 100 12, 100 15 L 100 19 C 82 23, 64 17, 44 21 C 26 18, 12 22, 0 16 Z",
    y: "0.16em",
    h: "0.74em",
    pad: "0.14em",
    duration: "230ms",
    opacity: 0.76,
  },
  {
    d: "M0 11 C 14 8, 26 15, 44 11 C 60 7, 74 14, 90 10 C 96 9, 100 12, 100 12 L 100 17 C 86 20, 68 16, 50 19 C 32 22, 16 17, 0 18 Z",
    y: "0.02em",
    h: "0.92em",
    pad: "0.04em",
    duration: "180ms",
    opacity: 0.8,
  },
  {
    d: "M0 14 C 10 7, 22 18, 40 9 C 56 2, 70 16, 86 11 C 94 8, 100 13, 100 10 L 100 18 C 88 22, 70 15, 52 21 C 32 24, 14 18, 0 20 Z",
    y: "0.12em",
    h: "0.8em",
    pad: "0.18em",
    duration: "220ms",
    opacity: 0.88,
  },
  {
    d: "M0 10 C 18 16, 32 6, 50 13 C 66 20, 80 8, 94 12 C 98 13, 100 11, 100 14 L 100 18 C 80 22, 62 16, 42 20 C 24 17, 10 21, 0 15 Z",
    y: "0.2em",
    h: "0.68em",
    pad: "0.1em",
    duration: "190ms",
    opacity: 0.78,
  },
  {
    d: "M0 13 C 8 8, 16 16, 30 11 C 46 5, 58 15, 74 9 C 86 5, 96 12, 100 8 L 100 16 C 88 20, 72 14, 54 18 C 36 22, 18 16, 0 19 Z",
    y: "0em",
    h: "0.96em",
    pad: "0.2em",
    duration: "210ms",
    opacity: 0.28,
    fill: "#000000",
  },
  {
    d: "M0 8 C 14 14, 26 5, 44 12 C 60 18, 74 7, 90 13 C 96 15, 100 11, 100 14 L 100 18 C 78 23, 60 16, 40 20 C 22 17, 8 21, 0 14 Z",
    y: "0.18em",
    h: "0.72em",
    pad: "0.06em",
    duration: "240ms",
    opacity: 0.34,
    fill: "#181717",
  },
  {
    d: "M0 12 C 12 7, 28 16, 46 10 C 62 5, 76 14, 92 9 C 97 8, 100 12, 100 11 L 100 17 C 84 21, 66 15, 48 19 C 28 23, 12 16, 0 18 Z",
    y: "0.1em",
    h: "0.84em",
    pad: "0.12em",
    duration: "170ms",
    opacity: 0.9,
    fill: "instagram",
  },
  {
    d: "M0 15 C 16 9, 30 18, 48 11 C 64 5, 78 15, 94 10 C 98 9, 100 13, 100 12 L 100 19 C 82 23, 64 17, 46 21 C 26 18, 10 22, 0 16 Z",
    y: "0.04em",
    h: "0.9em",
    pad: "0.16em",
    duration: "200ms",
    opacity: 0.55,
    fill: "#0A66C2",
  },
  {
    d: "M0 9 C 10 13, 22 6, 38 12 C 54 17, 68 7, 84 13 C 92 16, 98 11, 100 14 L 100 18 C 86 21, 70 16, 52 19 C 34 22, 16 15, 0 17 Z",
    y: "0.14em",
    h: "0.76em",
    pad: "0.05em",
    duration: "220ms",
    opacity: 0.9,
  },
] as const;

function markImage(d: string, opacity: number, fill = "#ffe14d") {
  const paint =
    fill === "instagram"
      ? `<defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#833AB4"/><stop offset="50%" stop-color="#E1306C"/><stop offset="100%" stop-color="#FCAF45"/></linearGradient></defs><path fill="url(#ig)" fill-opacity="${opacity}" d="${d}"/>`
      : `<path fill="${fill}" fill-opacity="${opacity}" d="${d}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" preserveAspectRatio="none">${paint}</svg>`;
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
        "--mark-image": markImage(
          stroke.d,
          stroke.opacity,
          "fill" in stroke ? stroke.fill : undefined,
        ),
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
    <div className="max-w-[360px]">
      <header className="mb-8 flex flex-col gap-0.5">
        <h1>Yash Sehgal</h1>
        <p className="text-[#888]">Design Engineer</p>
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
                  <span className="text-[#888]">{experience.year} / </span>
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
