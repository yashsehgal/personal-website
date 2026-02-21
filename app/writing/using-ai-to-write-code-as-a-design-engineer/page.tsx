import { InternalWritingContainer } from '@/components/sections/internal-writing-container';
import { cn } from '@/helpers/cn';

export default function UsingAIToWriteCodeAsADesignEngineerPage() {
  return (
    <InternalWritingContainer
      className={cn(
        '[&_.internal-writing-container-main-content]:space-y-8',
        '[&_.internal-writing-container-main-content]:font-serif',
        '[&_.internal-writing-container-main-content]:text-justify',
      )}>
      <p>
        Here&apos;s what I have been observing about AI code-writing tools as a
        frontend/design engineer. I&apos;m mentioning some of the work patterns
        that I believe can help you execute 10x better and faster.
      </p>
      <p>
        Orchestration, state management: For building faster and more optimistic
        frontends, it&apos;s important to have a good state management system.
        Use react-query, create hooks that can be reused by all components,
        cache your data using keys, use NUQs for browser-based state management,
        and avoid overcomplicating hooks and contexts.
      </p>
      <p>
        Build taste in design over time: Learn about micro-interactions, optical
        alignment and spacing. Everything should feel intentional. Now that
        every other platform uses shadcn or Base UI (built on Radix), it&apos;s
        important to have your platform&apos;s own design language.
      </p>
      <p>
        <ul className="list-disc list-inside space-y-4 [&_li]:pl-4">
          <li>
            You can use micro-interactions to improve the feel. Avoid
            over-animating things. Learn the basics of Bézier curves so that you
            can make animations feel a certain way.
          </li>
          <li>
            Focus on improving the user experience - you would not want users to
            get distracted while using your platform.
          </li>
          <li>
            Work on the intuitiveness of the platform. For example, in Linear,
            if a new user randomly tries to right-click on a ticket, it shows
            the context menu with the same options that you see when clicking
            the more options button (…) inside the ticket page. This adds a
            layer of “comfort” when a user uses your product, and it&apos;s
            really important.
          </li>
        </ul>
      </p>
      <p>
        Vibe-code features for your platform: It&apos;s a great way to
        experiment and try building a feature. Create vibe-coding PRs within
        your codebase, break things, build small MVPs, and figure out the edge
        cases and limitations, then once you make mistakes in the vibe-coding
        PR, you&apos;ll know what might break and what needs to be taken care
        of. Then start working on the main implementation in a different PR.
        This practice has helped me design many features in my previous
        companies. I still have a bunch of stale branches in my personal
        projects that I used for vibe-coding.
      </p>
      <p>
        Quality-of-life features: You use Linear, Notion, and Raycast. They all
        have this comforting feel. They are easy to use. These platforms cater
        to both basic users and power users. Keyboard shortcuts, copy to
        clipboard, converting USD to INR automatically, convert options for HEX
        codes on just a right-click.. they focus a lot on UX and studying user
        behaviours, so that when you use the product, you feel that everything
        is where it has to be. Natural and intuitive. Pre-cognitive.
      </p>
      <p>
        Many of the above-mentioned skills require practice and a lot of
        iteration over time in order to implement them well.
      </p>
    </InternalWritingContainer>
  );
}
