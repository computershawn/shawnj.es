import React, { useContext } from 'react';
import Head from 'next/head';

import { Grid, useMediaQuery } from '@chakra-ui/react';

import Card from '../src/components/Card';
import { headerHt, headerHtBig, pageTitlePrefix } from '../src/constants';
import { EntriesContext } from '../src/providers/entriesContext';

const ProjectsIndexPage = () => {
  const {
    appState: { projectsMetadata },
  } = useContext(EntriesContext);

  const [isLargerThan30em] = useMediaQuery('(min-width: 30em)');
  const mt = isLargerThan30em ? headerHtBig : headerHt;

  return (
    // Grid styling borrowed from https://css-tricks.com/a-grid-of-logos-in-squares/
    <>
      <Head>
        <title>{pageTitlePrefix}</title>
      </Head>
      <Grid
        templateColumns='repeat(auto-fill, minmax(320px, 1fr))'
        gap={0}
        mt={mt}
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
