import React, { useContext } from 'react';

import Grid from '../../src/components/Grid';
import Card from '../../src/components/Card';
import { store } from '../../src/providers/store';

const ProjectsIndexPage = () => {
  const globalState = useContext(store);
  const { state: { projectsMetadata } } = globalState;

  return (
    <Grid>
      {
        projectsMetadata.map(proj => {
          return (<Card key={proj.id} proj={proj} />);
        })
      }
    </Grid>
  );
};

export default ProjectsIndexPage;
