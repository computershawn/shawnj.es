import React from 'react';

import { IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuButton = ({ onClick }) => {
  return (
    <IconButton
      variant='ghost'
      onClick={onClick}
      aria-label='Menu button'
      size='lg'
    >
      <HamburgerIcon boxSize={8} />
    </IconButton>
  );
};

export default MenuButton;
