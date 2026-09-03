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
    <section className="space-y-4 w-lg">
      <p className="text-base text-muted-foreground">
        Design Engineer at{" "}
        <Link href="https://octolane.com" target="_blank">
          Octolane
        </Link>
        , a superintelligence platform for making human decisions quicker by
        managing and automating business operations by itself.
      </p>
      <p className="text-base text-muted-foreground">
        Previously, I was at{" "}
        <Link href="https://stackai.com" target="_blank">
          StackAI (acquired by Asana)
        </Link>
        , where I led design engineering. We worked on building a platform for
        building AI agents.
      </p>
      <p className="text-base text-muted-foreground">
        In my experience of doing design and engineering, I had a chance to work
        with some nice people and companies such as{" "}
        <Link href="https://github.com" target="_blank">
          GitHub
        </Link>
        {" and "}
        <Link href="https://rocketium.com" target="_blank">
          Rocketium
        </Link>
        .
      </p>
    </section>
  );
}
