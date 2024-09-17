import React, { useContext } from 'react';
import Head from 'next/head';

import { Grid } from '@chakra-ui/react';

import Card from '../src/components/Card';
import { pageTitlePrefix } from '../src/constants';
import { useHeaderDims } from '../src/hooks/use-header-dims';
import { EntriesContext } from '../src/providers/entriesContext';

const ProjectsIndexPage = () => {
  const {
    appState: { projectsMetadata },
  } = useContext(EntriesContext);

  const { topMargin } = useHeaderDims();

  return (
    // Grid styling borrowed from https://css-tricks.com/a-grid-of-logos-in-squares/
    <>
      <Head>
        <title>{pageTitlePrefix}</title>
      </Head>
      <Grid
        templateColumns='repeat(auto-fill, minmax(320px, 1fr))'
        gap={0}
        mt={topMargin}
        mx='auto'
      >
        {projectsMetadata.map((proj) => (
          <Card key={proj.id} proj={proj} />
        ))}
      </Grid>
    </>
  );
};

export default ProjectsIndexPage;
