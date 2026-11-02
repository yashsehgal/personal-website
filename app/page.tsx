import { ContentLink } from "@/components/content-link";

const work = [
  {
    year: "2026",
    company: "Octolane",
    role: "Design Engineer",
    href: "https://octolane.com",
    mark: 0,
  },
  {
    year: "2025",
    company: "StackAI",
    role: "Founding Design Engineer",
    href: "https://stack.ai",
    mark: 1,
  },
  {
    year: "2024",
    company: "Rocketium",
    role: "Design Engineer",
    href: "https://rocketium.com",
    mark: 2,
  },
  {
    year: "2023",
    company: "GitHub",
    role: "Engineering Intern",
    href: "https://github.com",
    mark: 3,
  },
  {
    year: "2021",
    company: "Economize",
    role: "Engineering Intern",
    href: "https://www.linkedin.com/company/economize",
    mark: 4,
  },
] as const;

const skills = [
  {
    name: "compose-video",
    about: "UI video demos",
    href: "/skills/compose-video",
    mark: 7,
  },
] as const;

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
            <li key={experience.company} className="flex justify-between gap-4">
              <span>
                <span className="text-muted tabular-nums">
                  {experience.year} /{" "}
                </span>
                <ContentLink href={experience.href} mark={experience.mark}>
                  {experience.company}
                </ContentLink>
              </span>
              <span className="shrink-0">{experience.role}</span>
            </li>
          ))}
        </ul>
        <ul className="mb-4">
          {skills.map((skill) => (
            <li key={skill.name} className="flex justify-between gap-4">
              <span className="whitespace-nowrap">
                <span className="text-muted">Skill / </span>
                <ContentLink href={skill.href} mark={skill.mark} external={false}>
                  {skill.name}
                </ContentLink>
              </span>
              <span className="text-right">{skill.about}</span>
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
