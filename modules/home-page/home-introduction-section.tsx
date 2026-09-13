import Link from "next/link";

const COMPANY_LINKS: Record<string, string> = {
  OCTOLANE: "https://octolane.com",
  STACKAI: "https://stackai.com",
  GITHUB: "https://github.com",
  ROCKETIUM: "https://rocketium.com",
};

export function HomeIntroductionSection() {
  return (
    <section className="flex flex-col items-start justify-start gap-8">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-base">Yash Sehgal</h1>
        <p className="text-base text-muted-foreground">Design Engineer</p>
      </div>
      <div className="w-xl space-y-2 text-balance text-muted-foreground wrap-break-word">
        <p className="leading-7">
          Currently working at{" "}
          <Link
            href={COMPANY_LINKS.OCTOLANE}
            target="_blank"
            className="text-foreground"
          >
            Octolane
          </Link>
          , a superintelligence platform for making human decisions quicker by
          managing and automating business operations by itself.
        </p>
        <p className="leading-7">
          Previously, I was at{" "}
          <Link
            href={COMPANY_LINKS.STACKAI}
            target="_blank"
            className="text-foreground"
          >
            StackAI
          </Link>
          , where I led design engineering.
        </p>
        <p className="leading-7">
          In my experience of doing design and engineering, I had a chance to
          work with some nice people and companies such as{" "}
          <Link
            href={COMPANY_LINKS.GITHUB}
            target="_blank"
            className="text-foreground"
          >
            GitHub
          </Link>
          {" and "}
          <Link
            href={COMPANY_LINKS.ROCKETIUM}
            target="_blank"
            className="text-foreground"
          >
            Rocketium
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
