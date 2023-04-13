import { cn } from '@/lib/utils';
import { createContext, useState } from 'react';

const CraftedDropdownContext = createContext({
  hasClosableOverlay: false,
  isMenuClosed: true,
});

const CraftedDropdown: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...attr }) => {
  const [hasClosableOverlay, setHasClosableOverlay] = useState(false);
  const [isMenuClosed, setIsMenuClosed] = useState(true);

  const playClickAudio = function () {
    const checkAudio = new Audio('/media/audio/check-sound.mp3');
    checkAudio.play();
  };

  return (
    <CraftedDropdownContext.Provider
      value={{
        hasClosableOverlay: hasClosableOverlay,
        isMenuClosed: isMenuClosed,
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
      {(context) => (
        <ul
          className={cn(
            'dropdown-menu-list',
            !context?.isMenuClosed ? 'visible' : 'hidden',
            className,
          )}
          {...attr}>
          {attr?.children}
        </ul>
      )}
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
        asChild ? 'dropdown-menu-option-asChild' : 'dropdown-menu-option',
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
