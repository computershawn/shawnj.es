import React from 'react';
import NextLink from 'next/link'

import { Link } from '@chakra-ui/react';

import Linkedin from '../../assets/linkedin-brands.svg';
import GitHub from '../../assets/github-brands.svg';
import Email from '../../assets/envelope-regular.svg';
import Unlink from '../../assets/unlink-solid.svg';
import { Box } from '@chakra-ui/react';

const iconColor = {
  svg: {
    fill: '#8a8a8a',
    transition: 'fill 200ms ease-in-out',
    _hover: {
      fill: '#222',
    }
  }
};

const NavIcon = ({
  icon = null,
  href,
  newTab = false,
  clickCallback,
}) => {
  let iconToRender;

  switch (icon) {
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
    <Box
      mr="2rem"
      display="inline-block"
      width="0.9rem"
      height="0.9rem"
      verticalAlign="-0.2rem"
    >
      <Link onClick={clickCallback} as={NextLink} href={href} isExternal={newTab} sx={iconColor}>
        {iconToRender}
      </Link>
    </Box>
  );
}

export default NavIcon
