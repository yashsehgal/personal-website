import Link from "next/link";

const COMPANY_LINKS: Record<string, string> = {
  OCTOLANE: "https://octolane.com",
  STACKAI: "https://stackai.com",
  GITHUB: "https://github.com",
  ROCKETIUM: "https://rocketium.com",
};

export function HomeScreenAboutSummarySection() {
  return (
    <>
      <header className="px-3">
        <h1 className="text-6xl font-medium font-handwriting">Yash</h1>
      </header>
      <section className="space-y-4 w-xl text-balance px-3">
        <p className="text-base text-muted-foreground">
          Design Engineer at{" "}
          <Link href={COMPANY_LINKS.OCTOLANE} target="_blank">
            Octolane
          </Link>
          , a superintelligence platform for making human decisions quicker by
          managing and automating business operations by itself. Previously, I
          was at{" "}
          <Link href={COMPANY_LINKS.STACKAI} target="_blank">
            StackAI (acquired by Asana)
          </Link>
          , where I led design engineering. We worked on building a platform for
          building AI agents.
        </p>
        <p className="text-base text-muted-foreground">
          In my experience of doing design and engineering, I had a chance to
          work with some nice people and companies such as{" "}
          <Link href={COMPANY_LINKS.GITHUB} target="_blank">
            GitHub
          </Link>
          {" and "}
          <Link href={COMPANY_LINKS.ROCKETIUM} target="_blank">
            Rocketium
          </Link>
          .
        </p>
      </section>
    </>
  );
}
