import NextLink from 'next/link'
import React from 'react';

import { Link } from '@chakra-ui/react';

import DismissIcon from '../../assets/dismiss-icon.svg';
import { Box, Button, Flex } from '@chakra-ui/react';

const OverlayNav = ({ toggle, isOpen }) => {
  const handleToggle = () => {
    toggle(isOpen);
  }

  const links = [
    { url: "http://cargocollective.com/designcpu", text: 'SJ×MDP', newTab: true },
    { url: "https://www.linkedin.com/in/shawnjdesign", text: 'LINKEDIN', newTab: true },
    { url: "https://github.com/computershawn", text: 'GITHUB', newTab: true },
    { url: "mailto:hello@shawnj.es?Subject=Hello", text: 'CONTACT', newTab: false },
  ];

  const linkStyle = {
    p: '0.5rem',
    textDecor: 'none',
    fontSize: '2.25rem',
    color: '#f1f1f1',
    display: 'block',
    transition: '0.3s',
    _hover: {
      color: '#f1f1f1',
    },
    _focus: {
      color: '#f1f1f1',
    }
  }

  return (
    <Flex
      width="100%"
      // height="${props => props.isOpen ? '100%' ="'0%'}"
      h={isOpen ? '100%' : '0'}
      position="fixed"
      zIndex={100}
      top={0}
      left={0}
      bgColor="rgba(0,0,0,0.9)"
      overflowX="hidden"
      transition="height 0.36s cubic-bezier(0.25, 1, 0.5, 1)"
      flexDir="column"
    >
      <div style={{ margin: '1rem' }}>
        {/* Consider making this an IconButton? */}
        <Button variant="ghost" onClick={handleToggle}>
          <Box
            w="2rem"
            h="2rem"
            sx={{
              svg: {
                fill: '#ffffff',
              }
            }}
          >
            <DismissIcon />
          </Box>
        </Button>
      </div>

      <Box
        position="relative"
        width="100%"
        text-align="center"
        margin="auto 0"
        bottom="2rem"
      >
        <Box mb="1rem">
          <Link
            as={NextLink} href="/"
            onClick={handleToggle}
            {...linkStyle}
          >
            <span>WORK</span>
          </Link>
        </Box>
        {links.map(link => {
          return (
            <div key={link.text}>
              <Link
                as={NextLink}
                href={link.url}
                onClick={handleToggle}
                isExternal={link.newTab}
                {...linkStyle}
              >
                {link.text}
              </Link>
            </div>
          );
        })}
      </Box>
    </Flex>
  );
};

export default OverlayNav;
