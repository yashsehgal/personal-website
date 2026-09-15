export function WorkExperienceSummarySection() {
  return (
    <section
      aria-label="Work experience summary"
      className="flex flex-col items-stretch gap-3 font-sans text-xs text-muted-foreground/70 w-[60%] leading-relaxed font-medium"
    >
      <article className="space-y-2">
        <p>
          I started as a UI designer right after high school. Before that I
          spent a lot of time exploring tech and design on my own. I loved
          making things from scratch that other people could actually use.
          During the 2020 lockdown I switched from UI design to code—Python,
          automations, data analysis, and small CLI apps.
        </p>
        <p>
          In college I interned as a frontend engineer. I worked in Vue, built a
          design system, cleaned up legacy components, and added a theme engine.
          That&apos;s when I learned to write code and design as a team.
        </p>
      </article>
      <article>
        <p>
          By 2022 I was at a startup building an end-to-end investment platform.
          Soon after, I interned at GitHub, working on internal tools and
          websites for events and initiatives. It was the stretch where I
          actually learned how to write production-grade code—with security,
          consistent design, and GitHub&apos;s Primer design system.
        </p>
      </article>
      <article>
        <p>
          I joined Rocketium as a design engineer in 2024. Most of my time went
          into quality-of-life work: advanced media search, asset management,
          and improvements to the canvas editor, including auto-layer renaming
          inspired by Figma and Diagram.
        </p>
      </article>
      <article>
        <p>
          I moved to StackAI in 2025—now acquired by Asana—as one of the
          founding design engineers. I led design on the dashboard first,
          focusing on accessibility, cleaner tables and filters, and a lot of
          quiet cleanup. Then I moved to the AI agent workflow builder:
          tightening up nodes, configuration, running agents, and copying them
          across projects. Most of that was TypeScript and React, with Framer
          Motion for the animations. I flew to San Francisco for the first time,
          met the team in person, and worked closely with some really sharp
          people. A lot of that work is still in the product today. I had the
          time of my life.
        </p>
      </article>
      <article>
        <p>
          Since 2026 I&apos;ve been at Octolane, working on AI chat and other
          parts of the platform—trying to make a traditional CRM feel a little
          less traditional. Still TypeScript, React, and Framer Motion.
          I&apos;ve been building a kanban board for deals, a better view for
          meeting recordings, and, inside chat, tools, widgets, a message queue,
          and a cleaner, more accessible questionnaire.
        </p>
      </article>
    </section>
  );
}
