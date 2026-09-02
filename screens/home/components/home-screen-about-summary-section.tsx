import Link from "next/link";

const COMPANY_LINKS: Record<string, string> = {
  OCTOLANE: "https://octolane.com",
  STACKAI: "https://stackai.com",
  GITHUB: "https://github.com",
  ROCKETIUM: "https://rocketium.com",
  STACK_ASANA_ACQUIRED:
    "https://asana.com/press/releases/pr/asana-acquires-stackai-adding-cross-system-execution-for-human-agent-teams/e7c73b97-ae8c-4e51-b927-189ccb184146",
};

export function HomeScreenAboutSummarySection() {
  return (
    <section className="space-y-4 w-md">
      <p className="text-lg font-medium leading-relaxed">
        Lately, my work has been focused on designing AI products with good
        experiences and user interactions. I&apos;m based in Bombay, India.
      </p>
      <p className="text-lg font-medium leading-relaxed">
        Working as a Design Engineer at{" "}
        <Link href={COMPANY_LINKS.OCTOLANE} target="_blank">
          Octolane
        </Link>
        , where we are building a system that handles customers, revenue
        pipelines, email interactions, everything for you by itself.
      </p>
      <p className="text-lg font-medium leading-relaxed">
        In my experience as a designer and an engineer, I have worked with
        companies including{" "}
        <Link href={COMPANY_LINKS.STACKAI} target="_blank">
          StackAI
        </Link>
        ,{" "}
        <Link href={COMPANY_LINKS.GITHUB} target="_blank">
          GitHub
        </Link>{" "}
        and{" "}
        <Link href={COMPANY_LINKS.ROCKETIUM} target="_blank">
          Rocketium
        </Link>
        .
      </p>
      <p className="text-lg font-medium leading-relaxed">
        Previously, I was at{" "}
        <Link href={COMPANY_LINKS.STACK_ASANA_ACQUIRED} target="_blank">
          StackAI (now acquired by Asana)
        </Link>
        , where I lead the overall design and experience of the platform for
        building AI agents quickly and in the most easy manner. I joined them as
        a founding engineer.
      </p>
    </section>
  );
}
