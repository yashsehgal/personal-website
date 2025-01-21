import { DemoBlock } from '@/app/writing/_components/demo-block';
import { WritingContainer } from '@/app/writing/_components/writing-container';
import { WritingContent } from '@/app/writing/_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '@/app/writing/_components/writing-header';
import { OverlayingVideoPlayer } from '@/app/writing/overlaying-video-player/_components/overlaying-video-player';

export default function PostOverlayingVideoPlayer() {
  return (
    <WritingContainer id="post__overlaying-video-player">
      <WritingHeader className="select-none">
        <WritingHeadline>Overlaying video player</WritingHeadline>
        <WritingDetails>Tuesday, 21st January, 2025</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[420px]">
          <OverlayingVideoPlayer />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
