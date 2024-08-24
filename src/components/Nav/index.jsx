import React, { useEffect, useContext, useState } from 'react';
import { createClient } from 'contentful';

import { Box, Flex } from '@chakra-ui/react';

import ShawnjLogo from '../../assets/shawnj-logo.svg';
import { store } from '../../providers/store';
import NavIcon from '../NavIcon';
import NavTextLink from '../NavTextLink';
import MenuButton from '../MenuButton';
import OverlayNav from '../OverlayNav';

const Nav = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  });

  useEffect(() => {
    // const fieldsToGet = 'fields.slug,fields.summary,fields.thumbnail,fields.title';
    const fieldsToGet = ['slug', 'summary', 'thumbnail', 'title'];
    client
      .getEntries({
        content_type: 'work',
        select: fieldsToGet.map((f) => `fields.${f}`).join(','),
      })
      .then((data) => {
        const works = data.items.map((item) => ({
          slug: item.fields.slug,
          summary: item.fields.summary,
          thumbnail: item.fields.thumbnail.fields.file.url,
          description: item.fields.thumbnail.fields.description,
          title: item.fields.title,
          id: item.sys.id,
        }));

        dispatch({
          type: 'SET_PROJECTS_METADATA',
          payload: works,
        });

        const projectLookup = {};
        works.forEach((proj) => {
          projectLookup[proj.slug] = {
            id: proj.id,
            summary: proj.summary,
            title: proj.title,
          };
        });

        dispatch({
          type: 'SET_SLUG_INFO',
          payload: projectLookup,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    } else {
      setMenuIsOpen(true);
    }
  };

  return (
    <>
      <Flex
        width='100%'
        height='6rem'
        position='fixed'
        top={0}
        left={0}
        boxShadow='0px 0.5px 1px #EEE'
        backgroundColor='#FCFCFC'
        zIndex={100}
      >
        <Flex
          fontSize='0.9rem'
          margin={['1rem', '0 2rem']}
          justify='space-between'
          align='center'
          width='100%'
        >
          <div>
            <Box display={['none', 'block']}>
              <NavTextLink text='WORK' href='/' className='current' />
              <NavTextLink
                text='SJ×MDP'
                href='http://cargocollective.com/designcpu'
                newTab
              />
              <NavIcon
                icon='linkedin'
                href='https://www.linkedin.com/in/shawnjdesign'
                newTab
              />
              <NavIcon
                icon='github'
                href='https://github.com/computershawn'
                newTab
              />
              <NavIcon
                icon='email'
                href='mailto:hello@shawnj.es?Subject=Hello'
              />
            </Box>
            <Box display={['block', 'none']} className='mobile-menu-toggle'>
              <MenuButton onClick={toggleMenu} />
            </Box>
          </div>
          <Box w='3.75rem' h='3.75rem'>
            <ShawnjLogo />
          </Box>
        </Flex>
      </Flex>
      <OverlayNav toggle={toggleMenu} isOpen={menuIsOpen} />
    </>
  );
};

export default Nav;
