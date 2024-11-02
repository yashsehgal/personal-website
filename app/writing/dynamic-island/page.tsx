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
import { CodeBlock } from '../_components/code-block';

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
        <h3>🧪 Understanding the Concept</h3>
        <p>
          The Dynamic Island is a shape-shifting UI element that adapts its size
          and appearance based on different states. Think of it as a living
          piece of your interface that smoothly morphs to show different types
          of content.
        </p>
        <p>My implementation has three main states:</p>
        <ul className="list-inside list-disc space-y-4">
          <li className="list-item mt-4">
            <b>IDLE</b> (130px width): The default pill-shaped state. Small,
            subtle, and unobtrusive - perfect for sitting quietly at the top of
            your screen.
          </li>
          <li className="list-item">
            <b>SUGGESTIVE</b> (220px width): A wider state that provides a
            gentle visual cue that something is happening. Great for short
            notifications or status updates.
          </li>
          <li className="list-item">
            <b>EXPANDED</b> (260px width): The fully expanded state where the
            component scales up to 120% with a spring animation. It takes on a
            more rectangular shape while keeping those slick rounded corners.
          </li>
        </ul>
        <p>
          What makes this component special is how it transitions between
          states. I&apos;ve added some neat features:
        </p>
        <ul className="space-y-4 list-disc list-inside">
          <li className="list-item">
            Smooth spring animations that give it a natural, iOS-like feel.
          </li>
          <li className="list-item">
            A subtle blur effect during transitions.
          </li>
          <li className="list-item">
            Dynamic border radius changes that match the original Apple
            implementation.
          </li>
          <li className="list-item">
            A float effect using shadows to make it feel like it's sitting above
            the interface.
          </li>
        </ul>
        <h3>Step 1: Setting Up the Foundation 🧱</h3>
        <p>
          First, I&apos;ll define the types and interfaces. This gives us a
          solid foundation and makes the component type-safe:
        </p>
        <CodeBlock lang="typescript">
          {`export enum DYNAMIC_ISLAND_STATE {
  IDLE = 'IDLE',
  SUGGESTIVE = 'SUGGESTIVE',
  EXPANDED = 'EXPANDED',
}

export interface DynamicIslandProps extends React.HTMLAttributes<HTMLDivElement> {}`}
        </CodeBlock>
        <h3>Step 2: Creating the Context 🌴</h3>
        <p>
          To manage the state globally, I&apos;ll need a context. This allows
          any child component to access and modify the Dynamic Island's state:
        </p>
        <CodeBlock lang="typescript">
          {`export type DynamicIslandContextType = {
  state: DYNAMIC_ISLAND_STATE;
  setState: React.Dispatch<SetStateAction<DYNAMIC_ISLAND_STATE>>;
};

const INITIAL_DYNAMIC_ISLAND_CONTEXT_DATA = {
  state: DYNAMIC_ISLAND_STATE.IDLE,
} as const;`}
        </CodeBlock>
        <h3>Step 3: Implementing the Provider 🕹️</h3>
        <p>
          The provider component wraps the application and manages the state:
        </p>
        <CodeBlock lang="typescript">
          {`export function DynamicIslandProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DYNAMIC_ISLAND_STATE>(
    INITIAL_DYNAMIC_ISLAND_CONTEXT_DATA.state
  );

  return (
    <DynamicIslandContext.Provider value={{ state, setState }}>
      {children}
    </DynamicIslandContext.Provider>
  );
}`}
        </CodeBlock>
        <h3>Step 4: Building the Core Component 🎨</h3>
        <p>
          Now for the exciting part - the actual Dynamic Island component! Let
          me break down the key features:
        </p>
        <b>State-Based Styling</b>
        <p>
          I use helper functions to determine the width and border radius based
          on the current state:
        </p>
        <CodeBlock lang="typescript">
          {`function getDynamicIslandWidthByState(state: DYNAMIC_ISLAND_STATE): string {
  switch (state) {
    case DYNAMIC_ISLAND_STATE.IDLE: return '130px';
    case DYNAMIC_ISLAND_STATE.SUGGESTIVE: return '220px';
    case DYNAMIC_ISLAND_STATE.EXPANDED: return '260px';
    default: return '';
  }
}

function getDynamicIslandBorderRaduisByState(state: DYNAMIC_ISLAND_STATE): string {
  switch (state) {
    case DYNAMIC_ISLAND_STATE.IDLE: return 'rounded-full';
    case DYNAMIC_ISLAND_STATE.SUGGESTIVE: return 'rounded-full';
    case DYNAMIC_ISLAND_STATE.EXPANDED: return 'rounded-3xl';
    default: return '';
  }
}`}
        </CodeBlock>
        <b>Animation Magic</b>
        <p>The component uses Framer Motion for smooth transitions:</p>
        <CodeBlock lang="typescript">
          {`<motion.div
  className={cn(
    'dynamic-island p-2 bg-black overflow-hidden font-sans text-white shadow-md shadow-black/20',
    getDynamicIslandBorderRaduisByState(state),
    className,
  )}
  animate={{
    width: getDynamicIslandWidthByState(state),
    scale: state === DYNAMIC_ISLAND_STATE.EXPANDED ? 1.2 : 1,
    filter: showBlur ? 'blur(2px)' : 'blur(0px)',
  }}
  transition={{
    type: 'spring',
    stiffness: 100,
    bounce: 0,
    filter: {
      type: 'spring',
      duration: 0.2,
    },
  }}
>`}
        </CodeBlock>
        <b>Blur Effect</b>
        <p>
          I&apos;ve added a subtle blur effect during state transitions to make
          them feel more polished:
        </p>
        <CodeBlock lang="typescript">
          {`useEffect(() => {
  setShowBlur(true);
  const showBlurTimeout = setTimeout(() => setShowBlur(false), 200);
  return () => clearTimeout(showBlurTimeout);
}, [state]);`}
        </CodeBlock>
        <h3>The above implementation will give you something like this,</h3>
        <DynamicIslandProvider>
          <DynamicIslandStateChangeDemoBlock />
        </DynamicIslandProvider>
        <h3>Best Practices and Tips 🎀</h3>
        <ul className="list-inside list-disc space-y-4">
          <li className="list-item">
            <b>Dynamic Sizing:</b> Each state has its own predefined width,
            creating a smooth transition between states.
          </li>
          <li className="list-item">
            <b>Border Radius Transitions:</b> The component adapts its shape
            using Tailwind&apos;s border radius classes - from fully rounded in
            IDLE and SUGGESTIVE states to slightly rounded in EXPANDED state.
          </li>
          <li className="list-item">
            <b>Animation Strategy,</b>
            <ul className="list-inside list-disc ml-4 space-y-4">
              <li className="list-item mt-4">
                Spring animations provide a natural, iOS-like feel
              </li>
              <li className="list-item">
                The blur effect adds polish during state transitions
              </li>
              <li className="list-item">
                Scale transformation in the expanded state creates a subtle pop
                effect
              </li>
            </ul>
          </li>
          <li className="list-item">
            <b>Styling Strategy:</b> Tailwind classes are composed using the cn
            utility function, making it easy to combine dynamic and static
            classes.
          </li>
        </ul>
        <h3>✨ final notes</h3>
        <p>
          this is a very low level implementation of this component. as the
          scale increases, the shared my not work at it&apos;s absolute best,
          but can be scaled easily. be creative and happy building!
        </p>
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
            className="focus:outline-none focus-visible:bg-blue-500 p-2 rounded-full hover:bg-white/20 shrink-0"
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
                className="focus:outline-none bg-blue-500 p-2 rounded-full  shrink-0"
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
