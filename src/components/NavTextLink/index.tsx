import React from 'react';
import NextLink from 'next/link';

import { Link } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const NavTextLink = ({ text, href, newTab }: { text: string; href: string; newTab?: boolean; }) => {
  const linkIsInternal = !href.startsWith('http');
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
