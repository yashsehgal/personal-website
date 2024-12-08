'use client';
import { useState } from 'react';
import { DemoBlock, DemoBlockFooter } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { LayersContainer } from './_components/video-layers';
import { cn } from '@/helpers';

export default function PostVideoLayers(): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <WritingContainer id="post__video-layers">
      <WritingHeader>
        <WritingHeadline>Video layers</WritingHeadline>
        <WritingDetails>Sunday, 8 December, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock
          className={cn('h-[520px] pb-12', darkMode && 'bg-neutral-900')}>
          <LayersContainer darkMode={darkMode} />
          <DemoBlockFooter className="justify-center items-center flex">
            <button onClick={() => setDarkMode(!darkMode)}>
              toggle to {darkMode ? 'light mode' : 'dark mode'}
            </button>
          </DemoBlockFooter>
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
