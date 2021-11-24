import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";

import Spinner from '../src/components/Spinner';
import { store } from '../src/providers/store';

export default () => {
  const router = useRouter();
  const { projectSlug } = router.query;
  const globalState = useContext(store);
  const { dispatch, state: { projectsMetadata } } = globalState;

  const idLookup = [
    {
        slug: 'ctrl+w',
        id: '2G8clclQ0IOI5yYDAlZ2aK',
        title: 'CTRL+W',
    },
    {
        slug: 'creative-code',
        id: '31Fa8rRSk3kySPXcdDB3Y6',
        title: 'Creative Code',
    }
  ];
  
  useEffect(() => {
    console.log('p', projectsMetadata);
  }, [ projectsMetadata ]);

  const [pageContent, setPageContent] = useState();
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <img
            src={`https://${node.data.target.fields.file.url}`}
            width="100%"
            // height={node.data.target.fields.file.details.image.height}
            // width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        );
      },
    },
  };

  useEffect(() => {
    if (projectSlug) {
      const client = createClient({
        space: process.env.NEXT_PUBLIC_SPACE,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      });
      
      const projectId = idLookup.find(item => item.slug === projectSlug).id;
      client.getEntry(projectId, { content_type: 'work', select: 'fields.projectContent' })
        .then(ent => {
          setPageContent(ent.fields.projectContent)
          dispatch({
            type: 'SET_PROJECTS_DATA',
            payload: {
              id: projectId,
              content: ent.fields.projectContent,
            },
          });  
        })
        .catch(console.error);
    }
  }, [projectSlug]);

  // useEffect(() => {
  //   // const fieldsToGet = 'fields.slug,fields.summary,fields.thumbnail,fields.title';
  //   const fieldsToGet = ['slug','summary','thumbnail','title'];
  //   client.getEntries({
  //     content_type: 'work',
  //     select: fieldsToGet.map(f => `fields.${f}`).join(',')
  //   })
  //     .then((data) => {
  //       const works = data.items.map(item => ({
  //         slug: item.fields.slug,
  //         summary: item.fields.summary,
  //         thumbnail: item.fields.thumbnail.fields.file.url,
  //         title: item.fields.title,
  //         id: item.sys.id,
  //       }));

  //       dispatch({
  //         type: 'SET_PROJECTS_DATA',
  //         payload: {
  //           id: 1234,
  //           content: 'i am content',
  //         },
  //       });
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, []);

  if (pageContent) {
    return (
        <>
          <h1>{'projectTitle'}</h1>
          <div>{documentToReactComponents(pageContent, renderOptions)}</div>
        </>
    );
  }

  return <Spinner />
}
