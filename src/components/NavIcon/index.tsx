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
    fill: 'gray.500',
    transition: 'fill 200ms ease-in-out',
    _hover: {
      fill: 'gray.700',
    }
  }
};

const NavIcon = ({
  icon = null,
  href,
  newTab = false,
  clickCallback,
  ariaLabel = '',
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
      display="inline-block"
      width={4}
      height={4}
      verticalAlign="-0.2rem"
    >
      <Link onClick={clickCallback} as={NextLink} href={href} isExternal={newTab} sx={iconColor} aria-label={ariaLabel}>
        {iconToRender}
      </Link>
    </Box>
  );
}

export default NavIcon
