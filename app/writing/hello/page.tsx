'use client';
import Image from 'next/image';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';
import { cn } from '@/helpers';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

const IMAGES: { file: string; description: string }[] = [
  {
    file: 'scene-outing.jpg',
    description: 'scene from rocketium hackathon resort',
  },
  {
    file: 'laptop-selfie.jpg',
    description: 'random laptop selfie during work',
  },
  {
    file: 'setup-work.jpg',
    description: 'a random desktop click',
  },
  {
    file: 'lake.jpg',
    description: 'boating scenes at ooty, india',
  },
  {
    file: 'talk.jpg',
    description: 'giving a session about my side project',
  },
  {
    file: 'desk-friends.jpg',
    description: 'my desk buddies',
  },
  {
    file: 'yash-on-slide.jpg',
    description: 'on a slide',
  },
  {
    file: 'authentic-food.jpg',
    description: 'treid some authentic andhra food, blr',
  },
];

export default function PostHello() {
  return (
    <>
      <WritingContainer id="post__hello">
        <WritingHeader>
          <WritingHeadline>hello there!</WritingHeadline>
          <WritingDetails>wednesday, 30st Oct, 2024</WritingDetails>
        </WritingHeader>
        <WritingContent>
          <p>
            hello, i&apos;m yash, and welcome to my latest portfolio site!
            i&apos;ve kept this version clean and minimal so that it feels like
            a blank canvas, ready for all the ideas i want to share. lately,
            i&apos;ve been working with some beautifully complex components, and
            i thought it would be fun to write about what i&apos;m learning and
            creating.
          </p>
          <p>
            this simple setup will help me share articles, thoughts, and stories
            about my journey with tech and design. a bit about me: i work mostly
            with react, typescript, and tailwind, and i love adding motion and
            life to my components with framer motion.
          </p>
          <p>
            what can you expect here? some days, i&apos;ll share tech tips and
            discoveries; other days, it might be about a song i can&apos;t stop
            playing, a book that inspired me, or something else that i think
            others will enjoy. i&apos;m glad you&apos;re here, and i hope you
            find something you like. thanks for stopping by!
          </p>
        </WritingContent>
      </WritingContainer>
      <div className="collage-wrapper flex justify-center gap-4 mt-12 max-md:hidden flex-wrap w-[90%] mx-auto">
        {IMAGES.map((image, index) => {
          return (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <motion.div
                    initial={{ filter: `blur(${index % 2 === 0 ? 3 : 6}px)` }}
                    animate={{ filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                    }}>
                    <Image
                      src={`/media/${image.file}`}
                      alt={image.file}
                      width={300}
                      height={500}
                      draggable={false}
                      className={cn(
                        'w-full h-[240px] rounded-3xl shadow-xl select-none',
                      )}
                    />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 text-white rounded-lg p-1 px-2">
                  {image.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </>
  );
}
