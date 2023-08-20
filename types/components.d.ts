declare interface HeadlineType extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 'base' | 'large' | 'x-large';
}

declare interface TextType extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'base' | 'large';
}

declare interface AnchorType extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export type { HeadlineType, TextType, AnchorType };
