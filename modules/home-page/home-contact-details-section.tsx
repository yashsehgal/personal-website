import { SOCIALS } from "@/common/socials";
import Link from "next/link";

export function HomeContactDetailsSection() {
  return (
    <section>
      <p className="tracking-tight text-muted-foreground uppercase">
        You can find me on{" "}
        <Link
          href={SOCIALS.X}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:bg-foreground hover:text-background"
        >
          X
        </Link>
        ,{" "}
        <Link
          href={SOCIALS.GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:bg-foreground hover:text-background"
        >
          GitHub
        </Link>{" "}
        &{" "}
        <Link
          href={SOCIALS.INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:bg-foreground hover:text-background"
        >
          Instagram
        </Link>
        , or write me an{" "}
        <Link
          href={`mailto:${SOCIALS.EMAIL_ADDRESS}`}
          className="text-foreground hover:bg-foreground hover:text-background"
        >
          email
        </Link>
      </p>
    </section>
  );
}
