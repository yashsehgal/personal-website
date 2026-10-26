const work = [
  {
    year: "2026",
    company: "Octolane",
    role: "Design Engineer",
    href: "https://octolane.com",
  },
  {
    year: "2025",
    company: "StackAI",
    role: "Founding Design Engineer",
    href: "https://stack.ai",
  },
  {
    year: "2024",
    company: "Rocketium",
    role: "Design Engineer",
    href: "https://rocketium.com",
  },
  {
    year: "2023",
    company: "GitHub",
    role: "Engineering Intern",
    href: "https://github.com",
  },
  {
    year: "2021",
    company: "Economize",
    role: "Engineering Intern",
    href: "https://www.linkedin.com/company/economize",
  },
] as const;

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
          <a
            href="https://octolane.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Octolane
          </a>
          , where I help design a better AI-powered CRM and do a lot of the
          backend alongside the design.
        </p>
        <p className="mb-4">
          Previously, I was at{" "}
          <a href="https://stack.ai" target="_blank" rel="noopener noreferrer">
            StackAI
          </a>
          , where I led design engineering, joining as one of the founding team
          members. I focused on making it easier to create AI agents (
          <a
            href="https://www.stackai.com/platform/knowledge-bases"
            target="_blank"
            rel="noopener noreferrer"
          >
            knowledge bases
          </a>
          ,{" "}
          <a
            href="https://www.stackai.com/changelog/08-20-2025"
            target="_blank"
            rel="noopener noreferrer"
          >
            evaluators
          </a>
          ,{" "}
          <a
            href="https://www.stackai.com/platform/workflow"
            target="_blank"
            rel="noopener noreferrer"
          >
            workflow for making agents
          </a>
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
                <span className="text-[#888]">{experience.year} / </span>
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="plain-link"
                >
                  {experience.company}
                </a>
              </span>
              <span className="shrink-0">{experience.role}</span>
            </li>
          ))}
        </ul>
        <p>
          You can find me on{" "}
          <a
            href="https://x.com/yashsehgaldev"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          ,{" "}
          <a
            href="https://github.com/yashsehgal"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          ,{" "}
          <a
            href="https://www.instagram.com/sehgalyash_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          , or{" "}
          <a
            href="https://www.linkedin.com/in/sehgalyash/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          , or reach me via{" "}
          <a href="mailto:hi@yashsehgal.com">email</a>.
        </p>
      </main>
    </div>
  );
}
