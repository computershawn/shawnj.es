/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";

import Spinner from '../../src/components/Spinner';
import { store } from '../../src/providers/store';

export default () => {
  const router = useRouter()
  const { id } = router.query

  const globalState = useContext(store);
  const { dispatch, state: { projectsData, projectsMetadata } } = globalState;

  useEffect(() => {
    // TODO: We should only call on Contentful if we don't have this project
    // stored in app context. Change this so that it checks first if the id
    // is present in projectsData (from app context). If already present, we
    // can grab it from there instead of making the API call
    if (projectsMetadata) {
      const client = createClient({
        space: process.env.NEXT_PUBLIC_SPACE,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      });

      client.getEntry(id, { content_type: 'work', select: 'fields.projectContent' })
        .then(ent => {
          dispatch({
            type: 'SET_PROJECTS_DATA',
            payload: {
              id,
              content: ent.fields.projectContent,
            },
          });  
        })
        .catch(console.error);
    }
  }, [projectsMetadata]);

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

  if (projectsData.hasOwnProperty(id)) {
    const projectTitle = projectsMetadata.find(p => p.id === id).title;
    return (
        <div style={{ maxWidth: '960px' }}>
          <h1>{projectTitle}</h1>
          <div>{documentToReactComponents(projectsData[id], renderOptions)}</div>
        </div>
    );
  }

  return <Spinner />
}
