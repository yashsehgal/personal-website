import Anchor from '@/pages/components/ui/anchor';
import { ProjectArchiveType } from '@/types/data';

export const ProjectArchiveData: Array<ProjectArchiveType> = [
  {
    category: "blog",
    headline: "Hello, start here 👋",
    description: "a small blog for introducing myself — wth is yash?",
    goto: "/hello"
  },
  {
    category: 'external-website',
    headline: 'crafts',
    description:
      'A website where I keep on adding UI components and various inspired designs',
    goto: 'https://crafts.yashsehgal.com',
  },
  {
    category: 'github-repo',
    headline: 'GitHub inspired landing page',
    description:
      "Designed GitHub's landing page on Figma & implemented using React",
    goto: 'https://github.com/yashsehgal/github-landing',
  },
  {
    category: 'github-repo',
    headline: 'Peerlist kinda shorthands',
    description: (
      <>
        Creating a short hand feature just like{' '}
        <Anchor href='https://peerlist.io' className='font-medium'>
          peerlist.io
        </Anchor>
      </>
    ),
    goto: 'https://github.com/yashsehgal/peerlist-shorthand-feature',
  },
  {
    category: "blog",
    headline: "Internship experience #1",
    description: "My internship experience at Economize.cloud in a short blog",
    goto: "https://github.com/yashsehgal/yashsehgal/blob/main/experiences/economize-experience.md"
  },
  {
    category: "blog",
    headline: "Introduction to Design Systems engineering",
    description: "A hands-on blog which explains the engineering concepts for building a design sytsem from a micro-level, from how to design components on Figma, to how to code them using react",
    goto: "https://yashsehgal.notion.site/Getting-started-with-Design-Systems-Engineering-00f9639dd68f4fd79701eb72ca5a1fec"
  }
];
