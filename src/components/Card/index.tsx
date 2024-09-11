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
          background='blackAlpha.900'
          color='#fefefe'
          display='flex'
          justify={['flex-start', 'center']}
          align='center'
          position='absolute'
          top={[0, '50%']}
          left={[1, '50%']}
          transform={[null, 'translate(-50%, -50%)']}
          w={[null, '100%']}
          maxW={[null, '100%']}
          h={[null, '100%']}
          zIndex={2}
          opacity={[1, 0]}
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
