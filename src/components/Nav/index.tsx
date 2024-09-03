import React, { useEffect, useContext, useState } from 'react';
import { createClient } from 'contentful';

import { Box, Flex } from '@chakra-ui/react';

import ShawnjLogo from '../../assets/shawnj-logo.svg';
import { EntriesContext } from '../../providers/entriesContext';
import NavIcon from '../NavIcon';
import NavTextLink from '../NavTextLink';
import MenuButton from '../MenuButton';
import OverlayNav from '../OverlayNav';
import { Entry } from '../../types';

const Nav = () => {
  const { dispatch } = useContext(EntriesContext);  
  useEffect(() => {
    const client = createClient({
      space: process.env.NEXT_PUBLIC_SPACE || '',
      accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN || '',
    });

    const fieldsToGet = ['slug', 'summary', 'thumbnail', 'title', 'index'];
    client
      .getEntries<Entry>({
        content_type: 'work',
        select: fieldsToGet.map((f) => `fields.${f}`).join(','),
      })
      .then((data) => {
        const works = data.items
          .map((item) => ({
            slug: item.fields.slug,
            summary: item.fields.summary,
            thumbnail: item.fields.thumbnail.fields.file.url,
            description: item.fields.thumbnail.fields.description,
            title: item.fields.title,
            id: item.sys.id,
            index: item.fields?.index || 0,
          }))
          .sort((a, b) => a.index - b.index);

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
  }, [dispatch]);

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
        height={24}
        position='fixed'
        top={0}
        left={0}
        boxShadow='0px 0.5px 1px #EEE'
        backgroundColor='#FCFCFC'
        zIndex={100}
      >
        <Flex
          fontSize='sm'
          my={[4, 0]}
          mx={[4, 8]}
          justify='space-between'
          align='center'
          width='100%'
        >
          <>
            <Box gap={6} display={['none', 'flex']}>
              <NavTextLink text='WORK' href='/' />
              <NavTextLink
                text='SJ×MDP'
                href='http://cargocollective.com/designcpu'
                newTab
              />
              <NavIcon
                icon='linkedin'
                href='https://www.linkedin.com/in/shawnjdesign'
                newTab
                ariaLabel='Find Shawn on LinkedIn'
              />
              <NavIcon
                icon='github'
                href='https://github.com/computershawn'
                newTab
                ariaLabel='View GitHub profile'
              />
              <NavIcon
                icon='email'
                href='mailto:hello@shawnj.es?Subject=Hello'
                ariaLabel='Send email to hello@shawnj.es'
              />
            </Box>
            <Box display={['block', 'none']}>
              <MenuButton onClick={toggleMenu} />
            </Box>
          </>
          <Box w={16} h={16}>
            <ShawnjLogo />
          </Box>
        </Flex>
      </Flex>
      <OverlayNav toggle={toggleMenu} isOpen={menuIsOpen} />
    </>
  );
};

export default Nav;
