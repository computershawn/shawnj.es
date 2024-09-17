import React from 'react';
import NextLink from 'next/link';

import {
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';

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
    pl: 2,
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
    <Modal onClose={toggle} size='full' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg='blackAlpha.900'>
        <ModalCloseButton size='lg' color='gray.50' top={3} left={5} />
        <ModalBody display='flex' alignItems='center'>
          <VStack align='flex-start'>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OverlayNav;
