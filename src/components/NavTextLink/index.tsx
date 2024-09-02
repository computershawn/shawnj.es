import React from 'react';
import NextLink from 'next/link';

import { Link } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const NavTextLink = ({ text, href, newTab }) => {
  const linkIsInternal = !href.startsWith('http');
  const t = newTab ? '_blank' : null;
  const linkContent = linkIsInternal ? (
    <Link as={NextLink} href={href}>
      {text}
    </Link>
  ) : (
    <Link as={NextLink} href={href} isExternal={newTab}>
      {text}
    </Link>
  );

  return (
    <Box display='inline-block'>
      {linkContent}
    </Box>
  );
};

export default NavTextLink;
