import React, { useContext } from 'react';
import Head from 'next/head';

import { Box } from '@chakra-ui/react';

import Card from '../src/components/Card';
import { EntriesContext } from '../src/providers/entriesContext';

const ProjectsIndexPage = () => {
  const {
    appState: { projectsMetadata },
  } = useContext(EntriesContext);

  return (
    // Grid styling borrowed from https://css-tricks.com/a-grid-of-logos-in-squares/
    <>
      <Head>
        <title>__S H A W N J A C K S O N__</title>
      </Head>
      <Box
        display='grid'
        gridTemplateColumns='repeat(auto-fill, minmax(320px, 1fr))'
        gridGap={0}
        mt={24}
        mx='auto'
        sx={{
          div: {
            position: 'relative',
            _before: {
              content: '""',
              display: 'block',
              paddingBottom: '100%',
            },
            div: {
              position: 'absolute',
              maxWidth: '100%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          },
        }}
      >
        {projectsMetadata.map((proj) => {
          return <Card key={proj.id} proj={proj} />;
        })}
      </Box>
    </>
  );
};

export default ProjectsIndexPage;
