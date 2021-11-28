import React, { useEffect, useContext } from 'react';
import { createClient } from 'contentful';
import Link from 'next/link'

import { store } from '../../src/providers/store';
import { mockProjectsMetadata, mockProjectsData } from '../mocks/mockProjectData';
import NavIcon from './NavIcon';

const Nav = () => {
  const globalState = useContext(store);
  const { dispatch, state: { projectsMetadata } } = globalState;

  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  });

  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      console.log("[Mocking project data temporarily so we don't need to call Contentful every page refresh]");
      
      dispatch({
        type: 'SET_PROJECTS_METADATA',
        payload: mockProjectsMetadata,
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
      const fieldsToGet = ['slug','summary','thumbnail','title'];
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
        })
        .catch((e) => {
          console.error(e);
        });
    }, []);
  }

  return (
    <header style={{ width: '100%' }}>
      <nav style={{ fontSize: '0.9rem', margin: '1rem' }}>
        {/* <Link href="/">
          <a>HOME</a>
        </Link> */}

        {/* <Link href="/notes">
          <a>NOTES</a>
        </Link> */}

        <Link href="/projects">
          <a>WERK</a>
        </Link>
        
        <a href="http://cargocollective.com/designcpu" target="_blank">
          SJ×MDP
        </a>

        <a href="https://www.linkedin.com/in/shawnjdesign" target="_blank">
          <NavIcon option="linkedin" />
        </a>

        <a href="https://github.com/computershawn" target="_blank">
          <NavIcon option="github" />
        </a>

        <a href="mailto:hello@shawnj.es?Subject=Hello">
          <NavIcon option="email" />
        </a>
      </nav>
    </header>
  )}

export default Nav
