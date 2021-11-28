import React from 'react';
import styled from 'styled-components';

import Linkedin from '../../assets/linkedin-brands.svg';
import GitHub from '../../assets/github-brands.svg';
import Email from '../../assets/envelope-regular.svg';

const IconWrapper = styled.div`
    margin-right: 2rem;
    display: inline-block;
    width: 0.9rem;
    height: 0.9rem;
    vertical-align: -0.2rem;
  `;

const NavIcon = ({ option = null }) => {
  let iconToRender;

  switch(option) {
    case 'linkedin':
      iconToRender = <Linkedin />;
      break;
    case 'github':
      iconToRender = <GitHub />;
      break;
    case 'email':
      iconToRender = <Email />;
      break;
    default:
      iconToRender = <Linkedin />;
  }

  return (
    // <div style={{marginRight: '2rem', display: 'inline-block', width: '1rem', height: '1rem'}}>
    //   {iconToRender}
    // </div>
    <IconWrapper>
      {iconToRender}
    </IconWrapper>
  );
}

export default NavIcon
