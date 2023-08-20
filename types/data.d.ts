import { HeadlineType, TextType } from './components';

declare type ProjectArchiveType = {
  category:
    | 'ui'
    | 'design'
    | 'component'
    | 'github-repo'
    | 'external-website'
    | 'blog';
  headline: React.ReactNode;
  description: React.ReactNode;
  goto: string;
};

export type { ProjectArchiveType };
