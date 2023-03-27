import { getPathMap } from '@/lib/pathmap';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ViewContainer from './ViewContainer';

type PathType = 'internal' | 'external';

interface PathMapProps {
  pathType?: PathType;
  title?: string;
  link?: string;
  isAvailable?: boolean;
}

const Navbar: React.FunctionComponent = () => {
  const router = useRouter();
  let pathName = router?.pathname;
  return (
    <nav className="navbar mt-12">
      <ViewContainer>
        <ul className="navbar-options-list flex flex-row items-center justify-end gap-2">
          {getPathMap()?.map(
            (pathMapItem: PathMapProps, pathMapIndex: number) => {
              if (pathMapItem?.isAvailable) {
                return (
                  <li
                    key={pathMapIndex}
                    className={cn(
                      'navbar-option-item option-item-available text-base text-zinc-500 hover:text-zinc-600',
                      pathName === pathMapItem?.link &&
                        'underline underline-offset-1',
                    )}>
                    {pathMapItem?.link && (
                      <Link
                        href={pathMapItem?.link}
                        target={
                          pathMapItem?.pathType === 'external'
                            ? '_blank'
                            : '_self'
                        }
                        className="">
                        {pathMapItem?.title}
                      </Link>
                    )}
                  </li>
                );
              } else {
                return (
                  <li
                    className="navbar-option-item option-item-unavailable cursor-not-allowed text-base text-zinc-400"
                    key={pathMapIndex}>
                    {pathMapItem?.title}
                  </li>
                );
              }
            },
          )}
        </ul>
      </ViewContainer>
    </nav>
  );
};

export default Navbar;
export type { PathMapProps };
