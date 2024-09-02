import React from 'react';
import NextLink from 'next/link';

import { Link } from '@chakra-ui/react';

import HomeIcon from '../../assets/home-icon.svg';
import { Box } from '@chakra-ui/react';

// `onClick`, `href`, and `ref` need to be passed
// to the DOM element for proper handling
const HomeButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <HomeIcon />
    </a>
  );
});

const FooterNav = () => {
  return (
    <Box my={8} display='flex' justify='center' align='center'>
      <Box w={10} h={10}>
        <Link as={NextLink} href='/' passHref>
          <HomeButton />
        </Link>
      </Box>
    </Box>
  );
};

export default FooterNav;
