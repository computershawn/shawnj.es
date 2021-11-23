import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";

import Spinner from '../src/components/Spinner';

export default () => {
  const router = useRouter();
  const { projectId } = router.query;

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

  const currentProject = idLookup.find(item => {
    return item.slug === projectId;
  });

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
    if (projectId) {      
      const client = createClient({
        space: process.env.NEXT_PUBLIC_SPACE,
        accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      });
      
      const actualId = idLookup.find(item => item.slug === projectId).id;
      client.getEntry(actualId, { content_type: 'work', select: 'fields.projectContent' })
        .then(ent => setPageContent(ent.fields.projectContent))
        .catch(console.error);
    }
  }, [projectId]);

  if (pageContent) {
    return (
        <>
          <h1>{currentProject.title}</h1>
          <div>{documentToReactComponents(pageContent, renderOptions)}</div>
        </>
    );
  }

  return <Spinner />
}
