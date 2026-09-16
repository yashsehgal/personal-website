import Link from "next/link";

const WORK_EXPERIENCE_LIST = [
  {
    id: "WORK_EXPERIENCE_OCTOLANE",
    title: "Octolane",
    designation: "Design Engineer",
    year: 2026,
    href: "https://octolane.com",
  },
  {
    id: "WORK_EXPERIENCE_STACKAI",
    title: "StackAI",
    designation: "Founding Design Engineer",
    year: 2025,
    href: "https://stackai.com",
  },
  {
    id: "WORK_EXPERIENCE_ROCKETIUM",
    title: "Rocketium",
    designation: "Design Engineer",
    year: 2024,
    href: "https://rocketium.com",
  },
  {
    id: "WORK_EXPERIENCE_GITHUB",
    title: "GitHub",
    designation: "Engineering Internship",
    year: 2023,
    href: "https://github.com/home",
  },
] as const;

export function HomeWorkExperienceListSection() {
  return (
    <section
      aria-label="Work experience list"
      className="flex flex-col items-stretch justify-start gap-3"
    >
      {WORK_EXPERIENCE_LIST.map((workExperience) => {
        return (
          //   <div
          //     key={workExperience.id}
          //     className="flex items-start justify-start flex-col gap-2"
          //   >
          //     <p className="font-light tabular-nums tracking-tight">
          //       {workExperience.year}
          //     </p>
          //     <div className="flex items-center justify-start">
          //       <div className="w-50 shrink-0">
          //         <Link
          //           href={workExperience.href}
          //           rel="noopener noreferrer"
          //           target="_blank"
          //           className="font-medium tracking-tight uppercase hover:bg-foreground hover:text-background"
          //         >
          //           {workExperience.title}
          //         </Link>
          //       </div>
          //       <p className="font-medium uppercase text-muted-foreground tracking-tight">
          //         {workExperience.designation}
          //       </p>
          //     </div>
          //   </div>
          <div
            key={workExperience.id}
            className="flex items-start justify-start gap-6"
          >
            <p className="font-light tabular-nums tracking-tight">
              {workExperience.year}
            </p>
            <div className="flex items-center justify-start">
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
          </div>
        );
      })}
    </section>
  );
}
