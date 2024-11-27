import Link from 'next/link';

const PROJECTS: { name: string; description: string; link: string }[] = [
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
                <Link href={project.link} className="font-semibold text-sm">
                  {project.name}
                </Link>
                <p className="text-sm">{project.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
