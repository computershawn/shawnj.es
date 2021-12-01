import React from 'react';
import styled from 'styled-components';

import ClearBtn from '../ClearBtn';
import MenuIcon from '../../assets/menu-icon.svg';

const IconContainer = styled.div`
  width: 32px;
  height: 32px;
`;

const MenuButton = ({ onClick }) => {  
  return  (
    <ClearBtn onClick={onClick}>
      <IconContainer>
        <MenuIcon />
      </IconContainer>
    </ClearBtn>
  );
};

export default MenuButton;
