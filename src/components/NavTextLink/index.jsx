import React from 'react';
import NextLink from 'next/link'

import { Link } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const NavTextLink = ({ text, href, newTab, cl }) => {
  const linkIsInternal = !href.startsWith('http');
  const t = newTab ? '_blank' : null;
  const linkContent = linkIsInternal ? (
    <Link as={NextLink} href={href}>
      <span className={cl}>{text}</span>
    </Link>
  ) : (
    <Link as={NextLink} href={href} isExternal={newTab}>
      {text}
    </Link>
  );

  return (
    <Box
      display="inline-block"
      mr="2rem"
      //   & > a {
      //     text-decoration: none;
      //     transition: color 200ms ease-in-out;

      //     &:visited, active {
      //       color: #8a8a8a;
      //     }

      //     &:hover, active {
      //       color: #222;
      //     }

      //     &.current {
      //       color: #222;
      //     }
      //   }
      // `;
    >
      {linkContent}
    </Box>
  );
};

export default NavTextLink;
