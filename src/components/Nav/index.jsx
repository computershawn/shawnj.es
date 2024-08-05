import React, { useEffect, useContext, useState } from 'react';
import { createClient } from 'contentful';
import styled from 'styled-components';

import { store } from '../../providers/store';
import NavIcon from '../NavIcon';
import NavTextLink from '../NavTextLink';
import MenuButton from '../MenuButton';
import OverlayNav from '../OverlayNav';
import ShawnjLogo from '../../assets/shawnj-logo.svg';

const StyledNav = styled.nav`
    width: 100%;
    height: 6rem;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0px 0.5px 1px #EEE;
    background-color: #FCFCFC;
    z-index: 1;
`;

const NavContent = styled.div`
  font-size: 0.9rem;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem;

  & .desktop-nav {
    display: none;
  }

  & .mobile-menu-toggle {
    display: block;
  }

  @media screen and (min-width: 480px) {
    margin: 0 auto;

    & .desktop-nav {
      display: block;
    }

    & .mobile-menu-toggle {
      display: none;
    }
  }
`;

const LogoContainer = styled.div`
  width: 40px;
  height: 40px;

  @media screen and (min-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

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
      <StyledNav>
        <NavContent>
          <div>
            <div className='desktop-nav'>
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
            </div>
            <div className='mobile-menu-toggle'>
              <MenuButton onClick={toggleMenu} />
            </div>
          </div>
          <LogoContainer>
            <ShawnjLogo />
          </LogoContainer>
        </NavContent>
      </StyledNav>
      <OverlayNav toggle={toggleMenu} isOpen={menuIsOpen} />
    </>
  );
};

export default Nav;
