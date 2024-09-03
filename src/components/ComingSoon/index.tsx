import React from 'react';
import NextLink from 'next/link';

import { Box, Link, Text } from '@chakra-ui/react';

const ComingSoon = () => {
  const headerHt = '7.5rem';

  return (
    <Box maxW={[null, 960]} mt={headerHt} mx={['1rem', 'auto']}>
      <Box m={[null, '3rem 1rem']}>
        <Text as='h3'>
          Please bear with me while I migrate projects from my original
          Squarespace site. Those projects are still viewable at{' '}
          <Link
            as={NextLink}
            href='https://designcpu.squarespace.com/'
            target='_blank'
          >
            designcpu.squarespace.com
          </Link>
          .
        </Text>
      </Box>
    </Box>
  );
};

export default ComingSoon;
