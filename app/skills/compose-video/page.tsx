import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { ContentLink } from "@/components/content-link";

export const metadata: Metadata = {
  title: "compose-video · Yash Sehgal",
  description:
    "Claude Code skills that turn a component's redesign into a short 4K film, built on Remotion.",
};

const REPO = "https://github.com/yashsehgal/compose-video";

const skills = [
  {
    name: "compose-animate",
    does: "builds the video: compares the old and new designs, picks 5–6 changes, morphs one into the other, writes the notes and ends on before/after.",
  },
  {
    name: "compose-timing",
    does: "paces it, so every move, note and sound lands on the right frame and each note stays up long enough to read.",
  },
  {
    name: "compose-sounds",
    does: "adds a version with sound: soft, synthesized effects sized to each change.",
  },
  {
    name: "compose-cleanup",
    does: "takes a step, scene or label out cleanly, with no stray state, note or gap.",
  },
  {
    name: "compose-audit",
    does: "checks a render before you share it, and ends with Ship or Block.",
  },
] as const;

const options = [
  { flag: "--project", does: "install into this project only" },
  { flag: "--skill <name>", does: "install one skill; repeat for more" },
  { flag: "--force", does: "replace installed skills, to update" },
  { flag: "--list", does: "list the skills, install nothing" },
] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-base">{title}</h2>
      {children}
    </section>
  );
}

export default function Page() {
  return (
    <div className="max-w-[420px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <Link href="/" className="mb-6 text-muted">
          Back
        </Link>
        <h1 className="text-base">compose-video</h1>
        <p className="text-muted">Skills for Claude Code</p>
      </header>
      <main>
        <p className="mb-4">
          A set of skills that help your agent turn a UI redesign into a short
          4K video. The component moves from its old design to its new one, a
          change at a time, with a hand-drawn note for each change, soft sound
          under each move, and a before/after ending. Built on{" "}
          <ContentLink href="https://www.remotion.dev" mark={0}>
            Remotion
          </ContentLink>
          .
        </p>
        <p className="mb-8">
          Free and open source under the MIT license, on{" "}
          <ContentLink href={REPO} mark={6}>
            GitHub
          </ContentLink>
          .
        </p>

        <Section title="Install">
          <CodeBlock code="npx github:yashsehgal/compose-video" />
          <p className="mt-2 text-muted">
            Installs all five skills into ~/.claude/skills. Then start a new
            Claude Code session. Needs Node.js 18 or later.
          </p>
        </Section>

        <Section title="Make your first video">
          <ol className="steps mb-4">
            <li>
              Open a{" "}
              <ContentLink
                href="https://www.remotion.dev/docs/getting-started"
                mark={1}
              >
                Remotion project
              </ContentLink>{" "}
              in Claude Code, or start one:
              <CodeBlock code="npx create-video@latest" />
            </li>
            <li>
              Ask for the video. Say which component, and which versions of it
              to compare:
              <CodeBlock code="Make a breakdown video of the card component, from its old design to the new one." />
            </li>
            <li>
              Watch it in Remotion Studio, or open the 4K render in{" "}
              <span className="inline-code">out/</span>:
              <CodeBlock code="npx remotion studio" />
            </li>
            <li>
              Give feedback in plain words, then add sound when the picture is
              right:
              <CodeBlock code="Make a version with sound. Keep the silent one as it is." />
            </li>
          </ol>
          <p className="text-muted">
            More things to ask: &ldquo;Keep the notes up longer,&rdquo;
            &ldquo;Remove the third step,&rdquo; &ldquo;Check it before I share
            it.&rdquo;
          </p>
        </Section>

        <Section title="The skills">
          <ul className="flex flex-col gap-2">
            {skills.map((skill, index) => (
              <li key={skill.name}>
                <ContentLink
                  href={`${REPO}/blob/main/skills/${skill.name}/SKILL.md`}
                  mark={(index + 2) % 10}
                >
                  {skill.name}
                </ContentLink>{" "}
                <span className="text-muted">{skill.does}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Install options">
          <ul className="mb-2 flex flex-col gap-1">
            {options.map((option) => (
              <li key={option.flag} className="flex justify-between gap-4">
                <span className="inline-code shrink-0">{option.flag}</span>
                <span className="text-muted text-right">{option.does}</span>
              </li>
            ))}
          </ul>
          <CodeBlock code="npx github:yashsehgal/compose-video --force" />
        </Section>

        <Section title="Requirements">
          <ul className="flex flex-col gap-1 text-muted">
            <li>Claude Code</li>
            <li>Node.js 18+ (23.6+ for the sound skill)</li>
            <li>Remotion v4</li>
            <li>ffmpeg, for the audit&apos;s checks</li>
            <li>git, with both versions of the component in its history</li>
          </ul>
        </Section>

        <p>
          Read the full guide in the{" "}
          <ContentLink href={`${REPO}#readme`} mark={7}>
            README
          </ContentLink>
          , or report a problem in{" "}
          <ContentLink href={`${REPO}/issues`} mark={8}>
            issues
          </ContentLink>
          .
        </p>
      </main>
    </div>
  );
}
