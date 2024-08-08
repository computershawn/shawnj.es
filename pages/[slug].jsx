import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";
import isEmpty from 'lodash/isEmpty';

import Spinner from '../src/components/Spinner';
import FooterNav from '../src/components/FooterNav';
import { store } from '../src/providers/store';
import { Box, Text } from '@chakra-ui/react';

const ProjectById = () => {
  const router = useRouter()
  const { slug } = router.query
  const globalState = useContext(store);
  const { dispatch, state: { projectsData, projectsMetadata, projectLookup } } = globalState;

  useEffect(() => {
    // Only proceed if projectLookup contains values; If it has values,
    // we'll be able to look up this project's ID based on its slug
    if (!isEmpty(projectLookup)) {
      const { id } = projectLookup[slug];
      // We only need to make a call to Contentful API if app context does
      // not already contain this project's data
      if (!projectsData.hasOwnProperty(id)) {
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
    }
  }, [projectLookup]);

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
    const { id, title } = projectLookup[slug];

    return (
      <Box
        as="main"
        maxW={[null, 960]}
        m='7.5rem auto 0'
        pb={[null, '3rem']}
      >
        <Text as="h1" my="2rem" mx={["1.5rem", 0]}>{title}</Text>
        <Box m={["0 1.5rem", 0]}>{documentToReactComponents(projectsData[id], renderOptions)}</Box>
        {/* <FooterNav /> */}
      </Box>
    );
  }

  return (
    <Box as="main">
      <Spinner />
    </Box>
  );
}

export default ProjectById;
