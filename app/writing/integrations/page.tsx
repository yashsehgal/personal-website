import { DemoBlock } from '@/app/writing/_components/demo-block';
import { WritingContainer } from '@/app/writing/_components/writing-container';
import { WritingContent } from '@/app/writing/_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
} from '@/app/writing/_components/writing-header';
import { IntegrationManager } from '@/app/writing/integrations/_components/integrations-manager';

export default function PostIntegrations() {
  return (
    <WritingContainer id="post__integrations">
      <WritingHeader>
        <WritingHeader>Integrations</WritingHeader>
        <WritingDetails>Sunday, 12th January, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="font-sans h-[420px] rounded-[28px]">
          <IntegrationManager />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
