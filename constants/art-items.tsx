export interface ArtItem {
  title: string;
  description: string;
  link: string;
}

export const ART_ITEMS: ArtItem[] = [
  {
    title: 'Background score: Kingdom Introduction',
    description:
      'Epic themed score. Instruments used: String Ensemble, French Horns, Trombones, Harp, Taiko Drums',
    link: 'https://x.com/yashsehgaldev/status/2013026621897523684',
  },
] as const;
