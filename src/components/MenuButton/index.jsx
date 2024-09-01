import React from 'react';

import MenuIcon from '../../assets/menu-icon.svg';
import { Box, Button } from '@chakra-ui/react';

const MenuButton = ({ onClick }) => {
  return (
    // TODO: It might be possible to use a Chakra IconButton
    <Button variant='ghost' onClick={onClick}>
      <Box w={8} h={8}>
        <MenuIcon />
      </Box>
    </Button>
  );
};

export default MenuButton;
