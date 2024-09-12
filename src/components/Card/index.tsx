import React from 'react';
import NextLink from 'next/link';

import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Card = ({ proj }) => {
  const { thumbnail, title, slug } = proj;

  return (
    <Link as={NextLink} href={slug}>
      <Box
        bgImage={thumbnail}
        bgPosition='center'
        bgSize='cover'
        bgRepeat='no-repeat'
        position='relative'
        _before={{
          content: '""',
          display: 'block',
          paddingBottom: '100%',
        }}
      >
        <Flex
          background={{ base: 'blackAlpha.900', md: 'blackAlpha.800' }}
          color='#fefefe'
          display='flex'
          justify={{ base: 'flex-start', md: 'center' }}
          align='center'
          position='absolute'
          top={{ base: 0, md: '50%' }}
          left={{ base: 1, md: '50%' }}
          transform={{ md: 'translate(-50%, -50%)' }}
          w={{ md: '100%' }}
          maxW={{ md: '100%' }}
          h={{ md: '100%' }}
          zIndex={2}
          opacity={{ base: 1, md: 0 }}
          transition='opacity 300ms'
          _hover={{
            opacity: 1,
          }}
        >
          <Text mx={6} fontSize='2xl'>
            {title}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default Card;
