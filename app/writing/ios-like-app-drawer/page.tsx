import { DemoBlock } from '@/app/writing/_components/demo-block';
import { WritingContainer } from '@/app/writing/_components/writing-container';
import { WritingContent } from '@/app/writing/_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
} from '@/app/writing/_components/writing-header';
import { IOSLikeAppDrawerDemo } from '@/app/writing/ios-like-app-drawer/_components/ios-like-app-drawer-demo';

export default function PostIOSLikeAppDrawer() {
  return (
    <WritingContainer id="post__integrations">
      <WritingHeader>
        <WritingHeader>iOS-like App Drawer</WritingHeader>
        <WritingDetails>Thursday, 30th October, 2025</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="font-sans h-[560px] rounded-[28px]">
          <IOSLikeAppDrawerDemo />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
