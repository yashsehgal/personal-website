import { ROUTES } from "@/common/routes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const WORK_EXPERIENCE_LIST = [
  {
    id: "WORK_EXPERIENCE_OCTOLANE",
    title: "Octolane",
    designation: "Design Engineer",
    year: 2026,
    href: "https://octolane.com",
    hasReadExperience: true,
  },
  {
    id: "WORK_EXPERIENCE_STACKAI",
    title: "StackAI",
    designation: "Founding Design Engineer",
    year: 2025,
    href: "https://stackai.com",
    experienceHref: ROUTES.WORK_EXPERIENCE_STACK_AI,
    hasReadExperience: true,
  },
  {
    id: "WORK_EXPERIENCE_ROCKETIUM",
    title: "Rocketium",
    designation: "Design Engineer",
    year: 2024,
    href: "https://rocketium.com",
    hasReadExperience: false,
  },
  {
    id: "WORK_EXPERIENCE_GITHUB",
    title: "GitHub",
    designation: "Engineering Internship",
    year: 2023,
    href: "https://github.com/home",
    hasReadExperience: false,
  },
] as const;

export function WorkExperienceCompaniesSection() {
  return (
    <section
      aria-label="Work experience companies"
      className="flex flex-col items-stretch"
    >
      {WORK_EXPERIENCE_LIST.map((workExperience) => {
        return (
          <div
            key={workExperience.id}
            className="flex items-center justify-between gap-8 py-2"
          >
            <div className="flex min-w-0 items-center justify-start">
              <div className="w-34 shrink-0">
                <Link
                  href={workExperience.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-medium tracking-tight uppercase hover:bg-foreground hover:text-background"
                >
                  {workExperience.title}
                </Link>
              </div>
              <p className="font-medium uppercase text-muted-foreground tracking-tight">
                {workExperience.designation}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 font-light tabular-nums tracking-tight">
              {workExperience.hasReadExperience ? (
                <>
                  <Link
                    href={
                      "experienceHref" in workExperience
                        ? workExperience.experienceHref
                        : "#"
                    }
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    Read Experience
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <span className="font-mono text-muted-foreground">/</span>
                </>
              ) : null}
              <p>{workExperience.year}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
