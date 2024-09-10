import React, { ReactElement } from 'react';
import NextLink from 'next/link';

import { IconButton } from '@chakra-ui/react';

import { UnlinkIcon } from '../CustomIcons';

const iconColor = {
  svg: {
    fill: 'gray.500',
    transition: 'fill 200ms ease-in-out',
    _hover: {
      fill: 'gray.700',
    },
  },
};

type NavIconType = {
  ariaLabel: string;
  clickCallback?: () => void;
  href: string;
  newTab?: boolean;
  icon?: ReactElement;
};

const NavIcon = (props: NavIconType) => {
  const { ariaLabel, clickCallback, href, icon, newTab } = props;
  const iconToRender = icon ?? <UnlinkIcon />;

  return (
    <IconButton
      variant='unstyled'
      aria-label={ariaLabel}
      size='xs'
      display='flex'
      as={NextLink}
      href={href}
      target={newTab ? '_blank' : '_self'}
      onClick={clickCallback}
      sx={iconColor}
    >
      {iconToRender}
    </IconButton>
  );
};

export default NavIcon;
