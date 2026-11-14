import { ContentLink } from "@/components/content-link";
import {
  contact,
  type Inline,
  intro,
  name,
  skills,
  tagline,
  work,
} from "@/lib/home";

function Prose({ parts }: { parts: readonly Inline[] }) {
  return parts.map((part, index) =>
    typeof part === "string" ? (
      part
    ) : (
      <ContentLink
        key={index}
        href={part.href}
        mark={part.mark}
        external={part.external}
      >
        {part.text}
      </ContentLink>
    ),
  );
}

export default function Page() {
  return (
    <div className="max-w-[300px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <h1 className="text-base">{name}</h1>
        <p className="text-muted">{tagline}</p>
      </header>
      <main>
        {intro.map((paragraph, index) => (
          <p key={index} className="mb-4">
            <Prose parts={paragraph} />
          </p>
        ))}
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
          <Prose parts={contact} />
        </p>
      </main>
    </div>
  );
}
