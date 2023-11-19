import { cn } from '@/lib/utils';
import {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CraftedDropdownContext } from './stores/CraftedDropdownContext';

const CraftedDropdown: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...attr }) => {
  const [hasClosableOverlay, setHasClosableOverlay] = useState(false);
  const [isMenuClosed, setIsMenuClosed] = useState(true);

  let defaultOptionConfig = {
    defaultSelectionOption: false,
    defaultTotalOptions: 1,
  };

  const playClickAudio = function () {
    const checkAudio = new Audio('/media/audio/check-sound.mp3');
    checkAudio.play();
  };

  const escapeAction = useCallback((event: any) => {
    if (event.key === 'Escape') {
      setHasClosableOverlay(false);
      setIsMenuClosed(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escapeAction, false);
    return () => {
      document.removeEventListener('keydown', escapeAction, false);
    };
  }, [escapeAction]);

  const selectDropdownAction = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // arrow-up action handler
      if (event.key === 'ArrowUp') {
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
      }
    },
    [],
  );

  return (
    <CraftedDropdownContext.Provider
      value={{
        hasClosableOverlay: hasClosableOverlay,
        isMenuClosed: isMenuClosed,
        selectedOption: defaultOptionConfig?.defaultSelectionOption,
        totalOptions: defaultOptionConfig?.defaultTotalOptions,
      }}>
      <div
        className={cn(
          'closable-action-overlay bg-transparent',
          hasClosableOverlay ? 'visible' : 'hidden',
        )}
        onClick={() => {
          setHasClosableOverlay(false);
          setIsMenuClosed(true);
        }}></div>
      <div className={cn('dropdown-content-container', className)} {...attr}>
        <details
          className={cn('dropdown-details w-[200px]')}
          onClick={() => {
            playClickAudio();
            setHasClosableOverlay(!hasClosableOverlay);
            setIsMenuClosed(false);
          }}
          open={isMenuClosed}>
          {attr?.children}
        </details>
      </div>
    </CraftedDropdownContext.Provider>
  );
};

const CraftedDropdownTrigger: React.FunctionComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...attr }) => {
  return (
    <summary
      role="button"
      className={cn(
        'dropdown-summary-action dropdown-summary-button',
        className,
      )}
      {...attr}>
      {attr?.children}
    </summary>
  );
};

const CraftedDropdownMenu: React.FunctionComponent<
  React.HTMLAttributes<HTMLElement>
> = ({ className, ...attr }) => {
  return (
    <CraftedDropdownContext.Consumer>
      {({ isMenuClosed, totalOptions }) => {
        const currentOptionNodes = Children.toArray(attr?.children).filter(
          // @ts-ignore
          (child) => child && child.type.name === 'CraftedDropdownMenuOption',
        );
        console.log('nodes found', currentOptionNodes);
        totalOptions = currentOptionNodes.length;
        console.log(totalOptions);
        return (
          <ul
            className={cn(
              'dropdown-menu-list',
              !isMenuClosed ? 'visible' : 'hidden',
              className,
            )}
            {...attr}>
            {attr?.children}
          </ul>
        );
      }}
    </CraftedDropdownContext.Consumer>
  );
};

interface CraftedDropdownMenuOptionProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  asChild?: boolean;
}

const CraftedDropdownMenuOption: React.FunctionComponent<
  CraftedDropdownMenuOptionProps
> = ({ asChild, className, ...attr }) => {
  return (
    <li
      className={cn(
        asChild
          ? 'dropdown-menu-option-item dropdown-menu-option-asChild'
          : 'dropdown-menu-option',
        className,
      )}
      {...attr}>
      {attr?.children}
    </li>
  );
};

export {
  CraftedDropdown,
  CraftedDropdownTrigger,
  CraftedDropdownMenu,
  CraftedDropdownMenuOption,
};
