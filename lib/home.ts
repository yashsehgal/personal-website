// The home page's content, shared by the page itself and by /index.md so
// the two can't drift apart.

// A run of prose: plain text, or a link drawn with one of ContentLink's
// marks. Text pieces carry their own spaces and punctuation.
export type Inline =
  | string
  | { text: string; href: string; mark: number; external?: boolean };

export const name = "Yash Sehgal";

export const tagline = "Design Engineer from Bombay";

export const intro: readonly (readonly Inline[])[] = [
  [
    "Currently, I am working at ",
    { text: "Octolane", href: "https://octolane.com", mark: 0 },
    ", where I help design a better AI-powered CRM and do a lot of the backend alongside the design.",
  ],
  [
    "Previously, I was at ",
    { text: "StackAI", href: "https://stack.ai", mark: 1 },
    ", where I led design engineering, joining as one of the founding team members. I focused on making it easier to create AI agents (",
    {
      text: "knowledge bases",
      href: "https://www.stackai.com/platform/knowledge-bases",
      mark: 2,
    },
    ", ",
    {
      text: "evaluators",
      href: "https://www.stackai.com/changelog/08-20-2025",
      mark: 3,
    },
    ", ",
    {
      text: "workflow for making agents",
      href: "https://www.stackai.com/platform/workflow",
      mark: 4,
    },
    ", and more areas within the platform)",
  ],
  [
    "In my free time, I make music and play the keyboard, and I'm learning sound engineering and composition. I read across a lot of subjects, and I love traveling and taking photographs.",
  ],
];

export const work = [
  {
    year: "2026",
    company: "Octolane",
    role: "Design Engineer",
    href: "https://octolane.com",
    mark: 0,
  },
  {
    year: "2025",
    company: "StackAI",
    role: "Founding Design Engineer",
    href: "https://stack.ai",
    mark: 1,
  },
  {
    year: "2024",
    company: "Rocketium",
    role: "Design Engineer",
    href: "https://rocketium.com",
    mark: 2,
  },
  {
    year: "2023",
    company: "GitHub",
    role: "Engineering Intern",
    href: "https://github.com",
    mark: 3,
  },
  {
    year: "2021",
    company: "Economize",
    role: "Engineering Intern",
    href: "https://www.linkedin.com/company/economize",
    mark: 4,
  },
] as const;

export const skills = [
  {
    name: "compose-video",
    about: "UI video demos",
    href: "/skills/compose-video",
    mark: 7,
  },
] as const;

export const contact: readonly Inline[] = [
  "You can find me on ",
  { text: "X", href: "https://x.com/yashsehgaldev", mark: 5 },
  ", ",
  { text: "GitHub", href: "https://github.com/yashsehgal", mark: 6 },
  ", ",
  {
    text: "Instagram",
    href: "https://www.instagram.com/sehgalyash_/",
    mark: 7,
  },
  ", or ",
  {
    text: "LinkedIn",
    href: "https://www.linkedin.com/in/sehgalyash/",
    mark: 8,
  },
  ", or reach me via ",
  {
    text: "email",
    href: "mailto:hi@yashsehgal.com",
    mark: 9,
    external: false,
  },
  ".",
];
