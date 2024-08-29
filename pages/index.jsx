import React, { useContext } from 'react';

import Card from '../src/components/Card';
import { store } from '../src/providers/store';
import { Box } from '@chakra-ui/react';

const ProjectsIndexPage = () => {
  const globalState = useContext(store);
  const { state: { projectsMetadata } } = globalState;

  return (
    // Grid styling borrowed from https://css-tricks.com/a-grid-of-logos-in-squares/
    <Box
      display='grid'
      gridTemplateColumns='repeat(auto-fill, minmax(320px, 1fr))'
      gridGap={0}
      margin='6rem auto 0'
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
          }
        }
      }}
    >
      {
        projectsMetadata.map(proj => {
          return (<Card key={proj.id} proj={proj} />);
        })
      }
    </Box>
  );
};

export default ProjectsIndexPage;
