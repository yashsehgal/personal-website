'use client';
import Link from 'next/link';

export default function WorkPage() {
  return (
    <div className="p-6 space-y-8">
      <div className="space-y-6">
        <h1 className="font-medium">Work and Projects</h1>
        <div className="space-y-2 text-neutral-500">
          <p className="text-balance leading-7">
            In my work experience, I have helped companies and teams make their
            platforms cleaner and more user-friendly.
          </p>
        </div>
      </div>
      <div className="space-y-12">
        <div className="space-y-6">
          <div className="flex items-center justify-start gap-3">
            <p className="text-neutral-400">2025</p>
            <h2 className="font-serif italic">StackAI</h2>
          </div>
          <p className="text-neutral-500 leading-7 text-balance">
            I worked on the{' '}
            <Link
              href="https://stack.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="clean-link">
              StackAI
            </Link>{' '}
            platform, designing and building interfaces for the dashboard and
            visual workflow builder while refining the end-to-end experience for
            creating and managing AI pipelines. I focused on quality-of-life
            improvements and accessibility, and contributed to features such as
            knowledge base evaluation, redesigning platform settings,
            simplifying actions and triggers, and adding advanced table
            filtering, along with several other product enhancements.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-start gap-3">
            <p className="text-neutral-400">2024</p>
            <h2 className="font-serif italic">Rocketium</h2>
          </div>
          <p className="text-neutral-500 leading-7 text-balance">
            At{' '}
            <Link
              href="https://rocketium.ai/"
              target="_blank"
              className="clean-link">
              Rocketium
            </Link>
            , I focused on improving the platform&apos;s UI and building
            Hydrogen, our internal design system, by creating scalable
            components and ensuring visual and functional consistency. I also
            worked on AI-powered features, designing clear user flows that made
            complex capabilities easy to use, while documenting systems to
            support future development and cross-team collaboration. This
            experience strengthened my ability to balance design and engineering
            to build clean, efficient, and user-centered solutions.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-start gap-3">
            <p className="text-neutral-400">2023</p>
            <h2 className="font-serif italic">Cookies</h2>
          </div>
          <p className="text-neutral-500 leading-7 text-balance">
            Worked on a component library inspired by shadcn, check out the{' '}
            <Link
              href="https://usecookies.vercel.app/"
              target="_blank"
              className="clean-link">
              library website
            </Link>
            .
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-start gap-3">
            <p className="text-neutral-400">2023</p>
            <h2 className="font-serif italic">GitHub</h2>
          </div>
          <p className="text-neutral-500 leading-7 text-balance">
            At{' '}
            <Link
              href="https://github.com/"
              target="_blank"
              className="clean-link">
              GitHub
            </Link>
            , I built a QR generator for internal teams using React and Fastify,
            integrating the Primer design system and designing a clean,
            intuitive interface in Figma. I collaborated with the DevRel
            engineering team on UI design and event websites, gaining hands-on
            experience in user-centered web development. I also set up GitHub
            Actions to automate preview deployments, Slack integrations, and
            project workflows, improving team efficiency and strengthening my
            expertise in modern web technologies, design systems, and
            automation.
          </p>
        </div>
      </div>
    </div>
  );
}
