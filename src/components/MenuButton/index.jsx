import React from 'react';

import MenuIcon from '../../assets/menu-icon.svg';
import { Box, Button } from '@chakra-ui/react';

const MenuButton = ({ onClick }) => {  
  return  (
    // Consider making this a Chakra icon button?
    <Button
      variant="ghost"
      onClick={onClick}
      // display="inline-block"
      // border="none"
      // margin={0}
      // padding={0}
      // textDecoration="none"
      // font-size="1rem"
      // cursor="pointer"
      // transition="background 250ms ease-in-out, transform 150ms ease"    
      // &:focus {
      //   outline: none;
      // }
    >
      <Box
        w="2rem"
        h="2rem"
      >
        <MenuIcon />
      </Box>
    </Button>
  );
};

export default MenuButton;
