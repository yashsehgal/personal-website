'use client';
import {
  DemoBlock,
  DemoBlockFooter,
} from '@/app/writing/_components/demo-block';
import { WritingContainer } from '@/app/writing/_components/writing-container';
import { WritingContent } from '@/app/writing/_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '@/app/writing/_components/writing-header';
import { PlatformUsageCard } from '@/app/writing/platform-usage-card/_components';
import { PLATFORM_USAGE_CARD_DEMO_CONTROLLER_VALUES } from '@/app/writing/platform-usage-card/_components/constants';
import { PLATFORM_USAGE_CARD_VIEW } from '@/app/writing/platform-usage-card/_components/interfaces';
import { cn } from '@/helpers';
import { useState } from 'react';

export default function PostPlatformUsageCard() {
  const [withAutoInterval, setWithAutoInterval] = useState<boolean>(true);
  const [currentState, setCurrentState] = useState<
    PLATFORM_USAGE_CARD_VIEW | undefined
  >(undefined);

  const CONTROLLER_BUTTONS_TW_CLASSES: string =
    '!bg-indigo-600 text-white' as const;

  return (
    <WritingContainer id="post__platform-usage-card">
      <WritingHeader>
        <WritingHeadline>Platform usage card</WritingHeadline>
        <WritingDetails>Wednesday, 1st January, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <DemoBlock className="h-[680px]">
          <PlatformUsageCard withAutoInterval={withAutoInterval} />
          <DemoBlockFooter className="flex items-center justify-center flex-wrap gap-2 select-none">
            <div className="text-xs flex items-center gap-1">
              <input
                id="withAutoInterval"
                name="withAutoInterval"
                type="checkbox"
                className="accent-indigo-600"
                checked={withAutoInterval}
                onChange={(e) => setWithAutoInterval(e.target.checked)}
              />
              <label htmlFor="withAutoInterval">Auto-interval</label>
            </div>
            <select
              disabled={withAutoInterval}
              value={currentState}
              onChange={(e) =>
                setCurrentState(e.target.value as PLATFORM_USAGE_CARD_VIEW)
              }>
              {Object.keys(PLATFORM_USAGE_CARD_DEMO_CONTROLLER_VALUES).map(
                (controller, index) => {
                  const typedController =
                    controller as PLATFORM_USAGE_CARD_VIEW;
                  return (
                    <option key={index} value={typedController}>
                      {
                        PLATFORM_USAGE_CARD_DEMO_CONTROLLER_VALUES[
                          typedController
                        ]
                      }
                    </option>
                  );
                },
              )}
            </select>
          </DemoBlockFooter>
        </DemoBlock>
      </WritingContent>
    </WritingContainer>
  );
}
