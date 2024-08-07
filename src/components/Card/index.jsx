import React from 'react';
import Link from 'next/link'
import { Box, Flex } from '@chakra-ui/react';

const captionStyle = {
  margin: '0 1.5rem',
  fontSize: '1.5rem',
};

const Card = ({ proj }) => {
  const { thumbnail, title, slug } = proj;

  return (
    <Box>
      <Link href="[slug]" as={`${slug}`} passHref>
        <>
          <Flex
            background='rgb(0, 0, 0, 0.8)'
            color='#fefefe'
            display='flex'
            justify='center'
            align='center'
            position='absolute'
            top={0}
            left={0}
            width='100%'
            height='100%'
            zIndex={2}
            opacity={0}
            transition='opacity 300ms'
            _hover={{
              opacity: 1,
            }}
          >
            <caption style={captionStyle}>{title}</caption>
          </Flex>
          <img src={thumbnail} alt={title} />
        </>
      </Link>
    </Box>
  );
};

export default Card;

// Use of Link should probably be more like this:
//
// import NextLink from 'next/link'
// import { Link } from '@chakra-ui/react'

// <Link as={NextLink} href='/home'>
//   Home
// </Link>
//
// Ref: https://v2.chakra-ui.com/docs/components/link