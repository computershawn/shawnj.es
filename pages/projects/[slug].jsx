/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";
import isEmpty from 'lodash/isEmpty';

import Spinner from '../../src/components/Spinner';
import { store } from '../../src/providers/store';

const ProjectById = () => {
  const router = useRouter()
  const { slug } = router.query

  const globalState = useContext(store);
  const { dispatch, state: { projectsData, projectsMetadata, idLookup } } = globalState;

  if (process.env.NODE_ENV !== 'development') {
    useEffect(() => {
      const id = idLookup[slug];
      // We only need to make a call to Contentful API if app context does
      // not already contain this project's data
      if (!isEmpty(projectsMetadata) && !projectsData.hasOwnProperty(id)) {
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
  }

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

  if (!isEmpty(projectsData) && !isEmpty(projectsMetadata)) {
    const proj = projectsMetadata.find(p => p.slug === slug);
    const id = idLookup[slug];
    const { title } = proj;

    return (
        <div>
          <h1>{title}</h1>
          <div>{documentToReactComponents(projectsData[id], renderOptions)}</div>
        </div>
    );    
  }

  return <Spinner />
}

export default ProjectById;
