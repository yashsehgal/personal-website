import React from 'react';

export const CraftedDropdownContext = React.createContext({
  hasClosableOverlay: false,
  isMenuClosed: true,
  selectedOption: false,
  totalOptions: 0,
});
