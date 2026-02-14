type WorkExperienceType = {
  companyName: string;
  companyLogo: string;
  companyWebsite: string;
  role: string;
  year: number;
};

export const WORK_EXPERIENCE: WorkExperienceType[] = [
  {
    companyName: 'StackAI',
    companyLogo: '/company/stackai-logo.png',
    companyWebsite: 'https://stack.ai',
    role: 'Founding Design Engineer',
    year: 2025,
  },
  {
    companyName: 'Rocketium',
    companyLogo: '/company/rocketium-logo.png',
    companyWebsite: 'https://rocketium.ai',
    role: 'Design Engineer',
    year: 2024,
  },
  {
    companyName: 'GitHub',
    companyLogo: '/company/github-logo.png',
    companyWebsite: 'https://github.com/home',
    role: 'Frontend Engineer (Intern)',
    year: 2023,
  },
] as const;
