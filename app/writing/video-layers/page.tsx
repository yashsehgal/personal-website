import { DemoBlock } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { LayersContainer } from './_components/video-layers';

export default function PostVideoLayers(): JSX.Element {
  return (
    <WritingContainer id="post__video-layers">
      <WritingHeader>
        <WritingHeadline>Video layers</WritingHeadline>
        <WritingDetails>Sunday, 8 December, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[560px]">
          <LayersContainer />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
