'use client';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="divide-y divide-neutral-200udarauda">
      <div className="space-y-6 p-6 pb-8">
        <div className="space-y-1">
          <h1 className="font-medium">Hi, I am Yash</h1>
          <p className="text-neutral-500 italic font-serif">Design Engineer</p>
        </div>
        <div className="space-y-2 text-neutral-500">
          <p className="leading-7">
            I like to build clean-looking products and websites. My work
            involves using design tools and frontend engineering to create
            components and design systems.
          </p>
          <p className="leading-7">
            My recent work experience while building{' '}
            <Link
              href="https://stack.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="clean-link">
              StackAI
            </Link>{' '}
            workflow builder: Designing and building interfaces for the
            dashboard and visual workflow builder, and refining the end-to-end
            experience for users creating and managing AI pipelines. I also
            worked on quality-of-life improvements and accessibility features
            alongside this.
          </p>
          <p className="text-balance leading-7">
            I am based out of India and I like to travel, study and make music.
          </p>
          <p className="text-balance leading-7">
            Write me at{' '}
            <Link
              href="mailto:yashsehgal.work@gmail.com"
              className="clean-link">
              yashsehgal.work@gmail.com
            </Link>
          </p>
        </div>
      </div>
      <div />
    </div>
  );
}
