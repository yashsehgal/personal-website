'use client';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { DemoBlock, DemoBlockFooter } from '../_components/demo-block';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { DynamicIsland } from './_components/dynamic-island';
import { DynamicIslandProvider } from './_components/dynamic-island-provider';
import { DYNAMIC_ISLAND_STATE } from './_components/types';
import { DynamicIslandContext } from './_components/dynamic-island-context';
import {
  IconEye,
  IconEyeClosed,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// State change demo block
{
  /* <DynamicIslandProvider>
  <DynamicIslandStateChangeDemoBlock />
</DynamicIslandProvider>; */
}

export default function PostDynamicIsland() {
  return (
    <WritingContainer id="post__dynamic-island">
      <WritingHeader>
        <WritingHeadline>writing a dynamic island component</WritingHeadline>
        <WritingDetails>saturday, 2nd Nov, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <p>
          one of my personal favorite from my components, even worked on
          building a dynamic island inspired component at rocketium for all the
          ai flows and events. while building it, i have explored many aspects
          of how design and animations are contolled via states and conditional
          actions in a robust way. also how extensive the stylings need to be
          for future applications. has been really fun and i would love to share
          the &apos;recipe&apos; with you in this one! the shared example and
          approach are very different from what we built at rocketium.
        </p>
        <h3>🧮 a real-life playable demo of the component</h3>
        <DynamicIslandProvider>
          <DynamicIslandMainDemoBlock />
        </DynamicIslandProvider>
      </WritingContent>
    </WritingContainer>
  );
}

function DynamicIslandMainDemoBlock() {
  const { state, setState } = useContext(DynamicIslandContext);
  const [eye, setEye] = useState<boolean>(false);

  const [showNewUser, setShowNewUser] = useState<boolean>(false);

  const toggleEye = () => {
    setEye((_eye) => !_eye);
  };

  const toggleShowNewUser = () => {
    setShowNewUser((_show) => !_show);
  };

  useEffect(() => {
    const newUserRemovalTimeout = setTimeout(() => {
      setShowNewUser(false);
    }, 100);

    return () => clearTimeout(newUserRemovalTimeout);
  }, [state]);

  return (
    <DemoBlock className="items-start pt-4 h-[400px]">
      <DynamicIsland>
        <div className="w-full flex items-center gap-2">
          <motion.button
            onClick={toggleEye}
            className="focus:outline-none focus-visible:text-orange-300 p-2 rounded-full hover:bg-white/20 shrink-0"
            whileTap={{ scale: 0.8 }}>
            {eye ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                key="eye-open">
                <IconEye size={14} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                key="eye-closed">
                <IconEyeClosed size={14} />
              </motion.div>
            )}
          </motion.button>
          <motion.div
            layout
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="user-list gap-2 flex items-center border-l pl-4 border-white/20 shrink-0">
            <AnimatePresence mode="popLayout">
              {showNewUser && (
                <motion.div
                  key="new-user"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}>
                  <Image
                    src="https://github.com/yashsehgal.png"
                    alt="yash"
                    width={40}
                    height={40}
                    className="w-6 h-6 rounded-full shrink-0 border-2 border-yellow-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {['vercel', 'shadcn'].map((profile, index) => {
              return (
                <Image
                  key={index}
                  src={`https://github.com/${profile}.png`}
                  alt={profile}
                  width={40}
                  height={40}
                  className="w-6 h-6 rounded-full shrink-0"
                />
              );
            })}
          </motion.div>
          {state === DYNAMIC_ISLAND_STATE.SUGGESTIVE && (
            <div className="user-list gap-2 flex items-center border-l pl-4 border-white/20 justify-end w-full">
              <motion.button
                onClick={toggleShowNewUser}
                className="focus:outline-none focus-visible:text-orange-300 p-2 rounded-full bg-white/15 hover:bg-white/20 shrink-0"
                whileTap={{ scale: 0.8 }}>
                {!showNewUser ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key="show-new-user">
                    <IconPlus size={14} />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key="hide-new-user">
                    <IconMinus size={14} />
                  </motion.div>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </DynamicIsland>
      <DemoBlockFooter className="flex items-center justify-center gap-3">
        <button onClick={() => setState(DYNAMIC_ISLAND_STATE.IDLE)}>
          idle
        </button>
        <button onClick={() => setState(DYNAMIC_ISLAND_STATE.SUGGESTIVE)}>
          suggestive
        </button>
        <button onClick={() => setState(DYNAMIC_ISLAND_STATE.EXPANDED)}>
          expanded
        </button>
      </DemoBlockFooter>
    </DemoBlock>
  );
}

function DynamicIslandStateChangeDemoBlock() {
  const { state, setState } = useContext(DynamicIslandContext);

  const handleDynamicDislandStateSwitch = (state: DYNAMIC_ISLAND_STATE) => {
    setState(state);
  };

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const SELECTED_STATE = e.target.value;
    switch (SELECTED_STATE) {
      case DYNAMIC_ISLAND_STATE.IDLE:
        handleDynamicDislandStateSwitch(DYNAMIC_ISLAND_STATE.IDLE);
        break;
      case DYNAMIC_ISLAND_STATE.SUGGESTIVE:
        handleDynamicDislandStateSwitch(DYNAMIC_ISLAND_STATE.SUGGESTIVE);
        break;
      case DYNAMIC_ISLAND_STATE.EXPANDED:
        handleDynamicDislandStateSwitch(DYNAMIC_ISLAND_STATE.EXPANDED);
        break;
      default:
        console.log(
          '[Error inside demo: DynamicIslandMainDemoBlock] selecting invalid DYNAMIC_ISLAND_STATE',
        );
        break;
    }
  };

  return (
    <DemoBlock className="items-start pt-6">
      <DynamicIsland />
      <DemoBlockFooter className="flex items-center justify-center">
        <select value={state} onChange={handleSelection}>
          {Object.keys(DYNAMIC_ISLAND_STATE).map((value, index) => {
            return (
              <option value={value} key={index}>
                {value}
              </option>
            );
          })}
        </select>
      </DemoBlockFooter>
    </DemoBlock>
  );
}
