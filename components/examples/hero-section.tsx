import { cn } from '@/helpers/cn';

type HeroSectionAlignmentOptions = 'left' | 'center' | 'right';

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  alignment: HeroSectionAlignmentOptions;
}

export function HeroSection({
  className,
  alignment = 'left',
  ...props
}: HeroSectionProps) {
  return (
    <div
      className={cn(
        'hero-section flex flex-col gap-2',
        alignment === 'left' && 'items-start text-left',
        alignment === 'center' && 'items-center text-center',
        alignment === 'right' && 'items-end text-right',
        className,
      )}
      {...props}
    />
  );
}

type HeroSectionTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function HeroSectionTitle({
  className,
  ...props
}: HeroSectionTitleProps) {
  return (
    <h1
      className={cn('hero-section-title text-xl font-semibold', className)}
      {...props}
    />
  );
}

type HeroSectionDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function HeroSectionDescription({
  className,
  ...props
}: HeroSectionDescriptionProps) {
  return (
    <p
      className={cn(
        'hero-section-description text-secondary w-2/3 max-lg:w-full',
        className,
      )}
      {...props}
    />
  );
}

type HeroSectionActionsContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function HeroSectionActionsContainer({
  className,
  ...props
}: HeroSectionActionsContainerProps) {
  return (
    <div
      className={cn(
        'hero-section-actions-container flex items-center gap-4 mt-4',
        className,
      )}
      {...props}
    />
  );
}

type HeroSectionPrimaryActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function HeroSectionPrimaryAction({
  className,
  ...props
}: HeroSectionPrimaryActionProps) {
  return (
    <button
      className={cn(
        'hero-section-primary-action px-4 py-2 rounded-lg bg-foreground text-background font-medium',
        className,
      )}
      {...props}
    />
  );
}

type HeroSectionSecondaryActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function HeroSectionSecondaryAction({
  className,
  ...props
}: HeroSectionSecondaryActionProps) {
  return (
    <button
      className={cn(
        'hero-section-secondary-action px-4 py-2 rounded-lg bg-background text-foreground border border-foreground/10 font-medium',
        className,
      )}
      {...props}
    />
  );
}
