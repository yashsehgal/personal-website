import { DemoBlock } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { CustomOrderPanel } from './_componnets/custom-order-panel';

export default function PostPanelWithCustomOrder() {
  return (
    <WritingContainer>
      <WritingHeader>
        <WritingHeadline>Panel with custom order</WritingHeadline>
        <WritingDetails>Sunday, 29th December, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[640px] font-sans">
          <CustomOrderPanel />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
