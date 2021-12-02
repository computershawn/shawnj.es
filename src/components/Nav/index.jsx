import React, { useEffect, useContext, useState } from 'react';
import { createClient } from 'contentful';
import styled from 'styled-components';

import { store } from '../../providers/store';
import { mockProjectsMetadata, mockProjectsData } from '../../mocks/mockProjectData';
import NavIcon from '../NavIcon';
import NavTextLink from '../NavTextLink';
import MenuButton from '../MenuButton';
import OverlayNav from '../OverlayNav';
import ShawnjLogo from '../../assets/shawnj-logo.svg';

const StyledNav = styled.nav`
    font-size: 0.9rem;
    margin: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .desktop-nav {
      display: none;
    }

    & .mobile-menu-toggle {
      display: block;
    }
    
    @media screen and (min-width: 480px) {
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
  const { dispatch, state: { projectsMetadata } } = globalState;

  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  });

  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      console.info("[Mocking project data in local development mode]");

      dispatch({
        type: 'SET_PROJECTS_METADATA',
        payload: mockProjectsMetadata,
      });

      const projectLookup = {};
      mockProjectsMetadata.forEach(proj => {
        projectLookup[proj.slug] = {
          id: proj.id,
          title: proj.title,
        }
      });

      dispatch({
        type: 'SET_SLUG_INFO',
        payload: projectLookup,
      });

      mockProjectsMetadata.forEach(pd => {
        const { id } = pd;
        const content = mockProjectsData[pd.id];

        dispatch({
          type: 'SET_PROJECTS_DATA',
          payload: {
            id,
            content,
          },
        });
      });
    }, []);
  } else {
    useEffect(() => {
      // const fieldsToGet = 'fields.slug,fields.summary,fields.thumbnail,fields.title';
      const fieldsToGet = ['slug', 'summary', 'thumbnail', 'title'];
      client.getEntries({
        content_type: 'work',
        select: fieldsToGet.map(f => `fields.${f}`).join(',')
      })
        .then((data) => {
          const works = data.items.map(item => ({
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
          works.forEach(proj => {
            projectLookup[proj.slug] = {
              id: proj.id,
              title: proj.title,
            }
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
  }

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const openMenu = () => {
    setMenuIsOpen(true);
  }

  const dismissMenu = () => {
    setMenuIsOpen(false);
  }

  const toggle = () => {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    } else {
      setMenuIsOpen(true);
    }
  }

  return (
    <>
      <header style={{ width: '100%' }}>
        <StyledNav>
          <div>
            <div className="desktop-nav">
              <NavTextLink text="WORK" href="/projects" className="current" />
              <NavTextLink text="SJ×MDP" href="http://cargocollective.com/designcpu" newTab />
              <NavIcon
                icon="linkedin"
                href="https://www.linkedin.com/in/shawnjdesign"
                newTab
              />
              <NavIcon
                icon="github"
                href="https://github.com/computershawn"
                newTab
              />
              <NavIcon
                icon="email"
                href="mailto:hello@shawnj.es?Subject=Hello"
              />
            </div>
            <div className="mobile-menu-toggle">
              <MenuButton onClick={toggle} />
            </div>
          </div>
          <LogoContainer>
            <ShawnjLogo />
          </LogoContainer>
        </StyledNav>
      </header>
      <OverlayNav toggle={toggle} isOpen={menuIsOpen} />
    </>
  )
}

export default Nav
