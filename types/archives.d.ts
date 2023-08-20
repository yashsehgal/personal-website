declare type ArchiveType = {
  category: 'blog' | 'component';
  location: 'internal' | 'external';
  headline: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
};

export type { ArchiveType };
