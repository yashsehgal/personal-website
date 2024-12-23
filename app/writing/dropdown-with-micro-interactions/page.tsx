import { DemoBlock } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { DropdownWithMicroInteractions } from './_components/dropdown';

export default function PostDropdownWithMicroInteractions() {
  return (
    <WritingContainer id="post__dropdown-with-micro-interactions">
      <WritingHeader>
        <WritingHeadline>Dropdown with micro interactions</WritingHeadline>
        <WritingDetails>Monday, 23 December, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[460px] bg-neutral-950 items-start pt-24 mt-12">
          <DropdownWithMicroInteractions />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
