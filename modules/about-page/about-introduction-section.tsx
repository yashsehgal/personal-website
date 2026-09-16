"use client";

import { ROUTES } from "@/common/routes";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutIntroductionSection() {
  return (
    <section
      aria-label="About introduction"
      className="flex flex-col font-sans text-xl leading-relaxed font-medium tracking-tight text-muted-foreground md:flex-row md:items-start md:justify-evenly md:gap-24"
    >
      <article className="w-md max-w-full space-y-3">
        <p>Hi, I am Yash Sehgal. As of today, I am living in Bombay, India.</p>
        <p>
          I work as a design engineer with teams and I am currently looking for
          new roles. You can read about my{" "}
          <Link
            href={ROUTES.WORK}
            className="inline-flex items-center gap-1 text-foreground hover:bg-foreground hover:text-background"
          >
            Recent Work
            <ArrowRight className="size-[0.85em]" />
          </Link>
        </p>
        <p>
          Besides spending a lot of time on my computer, I love listening and
          discussing music. I sometimes play around with keyboards and sound
          production platforms.
        </p>
        <p>
          I find time for journaling in my day, sometimes I just write a single
          line, but I really enjoy writing about how I feel and things I am
          planning to do. I post some of them under{" "}
          <Link
            href={ROUTES.WRITINGS}
            className="inline-flex items-center gap-1 text-foreground hover:bg-foreground hover:text-background"
          >
            My Writings
            <ArrowRight className="size-[0.85em]" />
          </Link>
        </p>
      </article>
      <figure className="relative aspect-[5/7] w-80 shrink-0 overflow-hidden">
        <Image
          priority
          src="/photos/yash-cover.png"
          alt="Yash Sehgal"
          fill
          sizes="320px"
          className="object-cover object-top"
          draggable={false}
        />
      </figure>
    </section>
  );
}
