import { DemoBlock } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { KnowledgeBaseCTA } from './_components/knowledge-base-cta';

export default function PostCTAWithMicroInteractions() {
  return (
    <WritingContainer id="post__cta-with-micro-interactions">
      <WritingHeader>
        <WritingHeadline>CTA with micro interactions</WritingHeadline>
        <WritingDetails>Thursday, 26th December, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[420px]">
          <KnowledgeBaseCTA />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
