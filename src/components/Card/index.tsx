import React from 'react';
import NextLink from 'next/link';

import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Card = ({ proj }) => {
  const { thumbnail, title, slug } = proj;

  return (
    <Box
      bgImage={thumbnail}
      bgPosition='center'
      bgSize='cover'
      bgRepeat='no-repeat'
    >
      <Link as={NextLink} href={slug}>
        <Flex
          background='rgb(0, 0, 0, 0.8)'
          color='#fefefe'
          display='flex'
          justify='center'
          align='center'
          position='absolute'
          top={0}
          left={0}
          w='100%'
          h='100%'
          zIndex={2}
          opacity={0}
          transition='opacity 300ms'
          _hover={{
            opacity: 1,
          }}
        >
          <Text mx={6} fontSize='2xl' align='center'>
            {title}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default Card;
