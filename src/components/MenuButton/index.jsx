import React from 'react';
import styled from 'styled-components';

import MenuIcon from '../../assets/menu-icon.svg';
import { Button } from '@chakra-ui/react';

const IconContainer = styled.div`
  width: 32px;
  height: 32px;
`;

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
      <IconContainer>
        <MenuIcon />
      </IconContainer>
    </Button>
  );
};

export default MenuButton;
