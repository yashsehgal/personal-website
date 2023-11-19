import React from 'react';
import CraftedButton from './CraftedButton';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { CheckIcon, Search } from 'lucide-react';

import StaticCommandPaletteContent from '@/public/static/command-palette-content.json';

const CraftedCommandPalette: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const openCommandPalette = function () {
    setIsOpen(true);
  };
  const closeCommandPalette = function () {
    setIsOpen(false);
  };

  React.useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event?.key === 'k' && (event?.metaKey || event?.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }

    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [isOpen]);

  const filteredAvengers =
    query === ''
      ? StaticCommandPaletteContent
      : StaticCommandPaletteContent.filter((avenger) =>
          avenger.content
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <>
      <span className="flex flex-row items-center gap-12">
        <CraftedButton type="button" onClick={openCommandPalette}>
          Click or use ⌘+k
        </CraftedButton>
        <div className="text-xs text-gray-500 flex flex-col items-start gap-6">
          <span>
            For Windows{' '}
            <kbd className="mx-1 p-2 bg-gray-200 border-b-2 border-gray-300 rounded-md shadow hover:shadow-sm">
              ctrl+k
            </kbd>
          </span>
          <span>
            For MacOS{' '}
            <kbd className="mx-1 p-2 bg-gray-200 border-b-2 border-gray-300 rounded-md shadow hover:shadow-sm">
              ⌘+k
            </kbd>{' '}
            /{' '}
            <kbd className="mx-1 p-2 bg-gray-200 border-b-2 border-gray-300 rounded-md shadow hover:shadow-sm">
              cmd+k
            </kbd>
          </span>
        </div>
      </span>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeCommandPalette}>
          <Combobox>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="w-[640px] pb-4 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <div className="command-palette-body-content p-4">
                      <div className="command-palette-search-input-wrapper flex flex-row items-center justify-start gap-3">
                        <Search className="w-5 h-5 text-gray-400" />
                        <Combobox.Input
                          type="text"
                          placeholder="Type to search and select  an avenger"
                          className="w-full focus:outline-none"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200" />
                    <Combobox.Options className="my-2">
                      {filteredAvengers.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredAvengers.map((avenger, avengerIndex) => (
                          <Combobox.Option
                            key={avengerIndex}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-orange-500 text-white'
                                  : 'text-gray-900'
                              }`
                            }
                            value={avenger}>
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}>
                                  {avenger.content}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-orange-600'
                                    }`}>
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Combobox>
        </Dialog>
      </Transition>
    </>
  );
};

export default CraftedCommandPalette;
