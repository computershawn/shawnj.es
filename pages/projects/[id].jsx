/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";

import Spinner from '../../src/components/Spinner';
import { store } from '../../src/providers/store';

const ProjectById = () => {
  const router = useRouter()
  const { id } = router.query

  const globalState = useContext(store);
  const { dispatch, state: { projectsData, projectsMetadata } } = globalState;

  useEffect(() => {
    // We only need to make a call to Contentful API if app context does
    // not already contain this project's data
    if (projectsMetadata && !projectsData.hasOwnProperty(id)) {
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
  }, [projectsData, projectsMetadata]);

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

export default ProjectById;
