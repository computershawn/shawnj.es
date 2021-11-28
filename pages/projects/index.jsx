import React, { useContext } from 'react';

import Card from '../../src/components/Card';
import { store } from '../../src/providers/store';

const ProjectsIndexPage = () => {
  const globalState = useContext(store);
  const { state: { projectsMetadata } } = globalState;

  const gridWrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  return (
    <div>
      <h1>werk</h1>
      <div style={gridWrapperStyle}>
        {projectsMetadata.map(proj => <Card key={proj.id} project={proj} />)}
      </div>
    </div>
  )
};

export default ProjectsIndexPage;
