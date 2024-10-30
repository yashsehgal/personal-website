import Image from 'next/image';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';

const IMAGES: string[] = [
  'scene-outing.jpg',
  'laptop-selfie.jpg',
  'setup-work.jpg',
];

export default function PostHello() {
  return (
    <WritingContainer id="post__hello">
      <WritingHeader>
        <WritingHeadline>hello there!</WritingHeadline>
        <WritingDetails>Wed 31st, 2024</WritingDetails>
      </WritingHeader>
      <WritingContent>
        <p>
          hello, i&apos;m yash, and welcome to my latest portfolio site!
          i&apos;ve kept this version clean and minimal so that it feels like a
          blank canvas, ready for all the ideas i want to share. lately,
          i&apos;ve been working with some beautifully complex components, and i
          thought it would be fun to write about what i&apos;m learning and
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
          others will enjoy. i&apos;m glad you&apos;re here, and i hope you find
          something you like. thanks for stopping by!
        </p>
        <div className="collage-wrapper flex justify-center gap-4 mt-12 max-md:hidden">
          {IMAGES.map((image, index) => {
            return (
              <Image
                key={index}
                src={`/media/${image}`}
                alt={image}
                width={300}
                height={500}
                className="w-auto h-[240px] rounded-3xl shadow-lg"
              />
            );
          })}
        </div>
      </WritingContent>
    </WritingContainer>
  );
}
