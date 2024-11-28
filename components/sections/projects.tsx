import Link from 'next/link';

const PROJECTS: {
  name: string;
  description: string;
  link: string;
  label?: string;
}[] = [
  {
    name: 'rightfit',
    description:
      'A community based hiring platform for engineers and designers.',
    link: 'https://rightfit.so',
  },
  {
    name: 'rightfit-hire',
    description: 'Hire platform for companies hiring via rightfit.',
    link: 'https://hire.rightfit.so',
  },
  {
    name: 'cookies',
    description:
      'A typescript, react, tailwind and framer-motion based UI kit.',
    link: 'https://usecookies.vercel.app/',
  },
  {
    name: 'GitHub Landing page redesign',
    description: "A redesign of GitHub's old landing page",
    link: 'https://github.com/yashsehgal/github-landing',
  },
  {
    name: 'GitHub Landing page redesign',
    description: 'Figma redesign of the old github.com/home page',
    label: 'Figma',
    link: 'https://www.figma.com/file/iuLdt124KSHb20VQ7Z8kPM/GitHub-Assignment-(Landing-Page-Design)?node-id=0%3A1&t=mwde1pgvTvNOqBif-1',
  },
  {
    name: 'Stack AI website redesign',
    description: 'A simple rebranding of stack-ai.com',
    link: 'https://github.com/yashsehgal/stack-ai-redesign',
  },
  {
    name: 'Stack AI website redesign',
    description: 'Figma redesign for the new landing page for stack-ai.com',
    label: 'Figma',
    link: 'https://www.figma.com/file/PIw6wbYcMe0JMwtA0yeuYy/StackAI-Landing-Page-Redesign---Design-Engineer-Assignment?type=design&node-id=1:2&mode=design&t=SVBbe6AGIXbRa9I9-1',
  },
];

export default function Projects() {
  return (
    <section className="projects space-y-3">
      <h2 className="text-sm font-semibold">Projects</h2>
      <ul className="project-list space-y-2">
        {PROJECTS.map((project, index) => {
          return (
            <li className="project-item" key={index}>
              <div className="project-item-content space-y-1">
                <div className="flex items-center gap-2">
                  {project.label && (
                    <p className="text-sm font-semibold">{project.label}/</p>
                  )}
                  <Link href={project.link} className="font-semibold text-sm">
                    {project.name}
                  </Link>
                </div>
                <p className="text-sm">{project.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
