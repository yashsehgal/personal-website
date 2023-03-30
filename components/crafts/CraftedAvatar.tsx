import { cn } from '@/lib/utils';
import Image from 'next/image';

type CraftedAvatarSizeType = 'small' | 'medium' | 'large' | 'extraLarge';

interface CraftedAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc?: string;
  fallback?: string;
  size?: CraftedAvatarSizeType;
}

const CraftedAvatarSizeClass = {
  small: 'w-[24px] h-[24px] text-xs',
  medium: 'w-[32px] h-[32px]',
  large: 'w-[42px] h-[42px]',
  extraLarge: 'w-[56px] h-[56px] text-xl',
};

const CraftedAvatar: React.FunctionComponent<CraftedAvatarProps> = ({
  imgSrc,
  fallback,
  size = 'medium',
  className,
  ...attr
}) => {
  return (
    <div
      className={cn(
        'avatar-content-wrapper rounded-full overflow-hidden',
        CraftedAvatarSizeClass[size],
        fallback
          ? 'bg-orange-500 text-white flex flex-row items-center justify-center cursor-default select-none'
          : '',
        className,
      )}
      {...attr}>
      {imgSrc &&
        typeof imgSrc === 'string' &&
        ((size === 'small' && (
          <Image src={imgSrc} alt={'avatar'} width={'32'} height={'32'} />
        )) ||
          (size === 'medium' && (
            <Image src={imgSrc} alt={'avatar'} width={'32'} height={'32'} />
          )) ||
          (size === 'large' && (
            <Image src={imgSrc} alt={'avatar'} width={'64'} height={'64'} />
          )) ||
          (size === 'extraLarge' && (
            <Image src={imgSrc} alt={'avatar'} width={'64'} height={'64'} />
          )))}
      {!imgSrc && fallback && (
        <>
          <span>{fallback}</span>
          <span className="sr-only">{fallback}</span>
        </>
      )}
    </div>
  );
};

export { CraftedAvatar };
