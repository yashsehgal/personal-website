import { DemoBlock } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { AutomationFlow } from './_components/automation-flow';

export default function PostAutomationFlowComponent(): JSX.Element {
  return (
    <WritingContainer id="post__automation-flow-component">
      <WritingHeader>
        <WritingHeadline>Automation flow component</WritingHeadline>
        <WritingDetails>Wednesday, 27th November, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[420px]">
          <AutomationFlow />
        </DemoBlock>
        <p className="mt-12">
          This Automation Flow component is a dynamic visualization tool that
          showcases development activities across GitHub and Slack platforms. It
          features a rotating display of commit messages and Slack
          communications, enhanced with smooth animations using Framer Motion.
          The component includes integration cards for both GitHub and Slack
          that respond to their respective activities with visual feedback,
          making it perfect for development dashboards and team activity
          monitoring.
        </p>
      </WritingContent>
    </WritingContainer>
  );
}
