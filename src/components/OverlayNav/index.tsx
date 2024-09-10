import React from 'react';
import NextLink from 'next/link';

import { IconButton, Link, VStack } from '@chakra-ui/react';

import { Box, Flex } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const OverlayNav = ({ toggle, isOpen }) => {
  const handleToggle = () => {
    toggle(isOpen);
  };

  const links = [
    {
      url: 'http://cargocollective.com/designcpu',
      text: 'SJ×MDP',
      newTab: true,
    },
    {
      url: 'https://www.linkedin.com/in/shawnjdesign',
      text: 'LINKEDIN',
      newTab: true,
    },
    { url: 'https://github.com/computershawn', text: 'GITHUB', newTab: true },
    {
      url: 'mailto:hello@shawnj.es?Subject=Hello',
      text: 'CONTACT',
      newTab: false,
    },
  ];

  const linkStyle = {
    p: 2,
    pl: 8,
    textDecor: 'none',
    fontSize: '4xl',
    color: 'gray.50',
    display: 'block',
    transition: '0.3s',
    _hover: {
      color: 'gray.50',
    },
    _focus: {
      color: 'gray.50',
    },
  };

  return (
    <Flex
      width='100%'
      h={isOpen ? '100%' : '0'}
      position='fixed'
      zIndex={100}
      top={0}
      left={0}
      bgColor='blackAlpha.900'
      overflowX='hidden'
      transition='height 0.36s cubic-bezier(0.25, 1, 0.5, 1)'
      flexDir='column'
    >
      <Box mt={8} mx={8}>
        <IconButton
          variant='ghost'
          onClick={handleToggle}
          aria-label='Dismiss mobile navigation'
          size='lg'
        >
          <CloseIcon color='#ffffff' boxSize={8} />
        </IconButton>
      </Box>

      <Box
        position='relative'
        width='100%'
        text-align='center'
        margin='auto 0'
        bottom={8}
      >
        <VStack mb={4} align='flex-start'>
          <Link as={NextLink} href='/' onClick={handleToggle} {...linkStyle}>
            WORK
          </Link>
          {links.map((link) => {
            return (
              <Link
                key={link.text}
                as={NextLink}
                href={link.url}
                onClick={handleToggle}
                isExternal={link.newTab}
                {...linkStyle}
              >
                {link.text}
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
};

export default OverlayNav;
