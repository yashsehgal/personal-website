import Link from 'next/link';

export default function Page() {
  return (
    <div className="divide-y divide-neutral-200">
      <div className="space-y-4 p-6 pb-8">
        <h1 className="font-medium">About me</h1>
        <div className="space-y-2 text-neutral-500">
          <p>
            I like to build clean looking products and websites. My work
            involves using design tools and frontend engineering to create
            components and design systems.
          </p>
          <p>
            Recently, I&apos;ve been working on the{' '}
            <Link
              href="https://stack.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="clean-link">
              StackAI
            </Link>{' '}
            platform: Designing and building interfaces for the dashboard and
            visual workflow builder, and refining the end-to-end experience for
            users creating and managing AI pipelines. Worked on quality-of-life
            improvements and accessibility features alongside.
          </p>
          <p className="text-balance">
            I am based out of India and I like to travel, study and make music.
          </p>
        </div>
      </div>
      <div />
    </div>
  );
}
