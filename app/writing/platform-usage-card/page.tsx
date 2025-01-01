'use client';
import { DemoBlock } from '@/app/writing/_components/demo-block';
import { WritingContainer } from '@/app/writing/_components/writing-container';
import { WritingContent } from '@/app/writing/_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '@/app/writing/_components/writing-header';
import { PlatformUsageCard } from '@/app/writing/platform-usage-card/_components';

export default function PostPlatformUsageCard() {
  return (
    <WritingContainer id="post__platform-usage-card">
      <WritingHeader>
        <WritingHeadline>Platform usage card</WritingHeadline>
        <WritingDetails>Wednesday, 1st January, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[680px]">
          <PlatformUsageCard />
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
