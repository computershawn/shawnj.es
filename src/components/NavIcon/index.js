import React from 'react';
import styled from 'styled-components';

import Linkedin from '../../assets/linkedin-brands.svg';
import GitHub from '../../assets/github-brands.svg';
import Email from '../../assets/envelope-regular.svg';
import Unlink from '../../assets/unlink-solid.svg';

const IconWrapper = styled.div`
    margin-right: 2rem;
    display: inline-block;
    width: 0.9rem;
    height: 0.9rem;
    vertical-align: -0.2rem;

    & > a > svg {
      fill: #8a8a8a;
      transition: fill 200ms ease-in-out;
  
      &:hover {
        fill: #222;
      }
    }
  `;

const NavIcon = ({
  icon = null,
  href = "http://www.example.com",
  newTab = false,
  className,
}) => {
  let iconToRender;

  switch(icon) {
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
      iconToRender = <Unlink />;
  }

  return (
    <IconWrapper>
      <a className={className} href={href} target={newTab ? '_blank' : null}>
        {iconToRender}
      </a>
    </IconWrapper>
  );
}

export default NavIcon
