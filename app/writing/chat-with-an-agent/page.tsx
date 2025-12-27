import { DemoBlock } from '@/app/writing/_components/demo-block';
import { WritingContainer } from '@/app/writing/_components/writing-container';
import { WritingContent } from '@/app/writing/_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '@/app/writing/_components/writing-header';
import { ChatWithAnAgentPreviewComponent } from '@/app/writing/chat-with-an-agent/_components/chat-with-an-agent-preview-component';

export default function PostChatWithAnAgent() {
  return (
    <WritingContainer id="post__dropdown-with-micro-interactions">
      <WritingHeader>
        <WritingHeadline>Agentic chat preview</WritingHeadline>
        <WritingDetails>Sunday, 28 December 2025</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <ChatWithAnAgentPreviewComponent />
      </WritingContent>
    </WritingContainer>
  );
}
