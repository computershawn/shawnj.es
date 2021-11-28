import React, { useContext } from 'react';
import Link from 'next/link'

// import Card from '../../src/components/Card';
import Grid from '../../src/components/Grid';
import { store } from '../../src/providers/store';

const ProjectsIndexPage = () => {
  const globalState = useContext(store);
  const { state: { projectsMetadata } } = globalState;

  const gridWrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  return (
    <Grid>
      {projectsMetadata.map(proj => (
        <div key={proj.id}>
          <Link key={proj.id} href="/projects/[proj.id]" as={`/projects/${proj.id}`}>
            <a>
              <img src={proj.thumbnail} alt={proj.title} />
            </a>
          </Link>
        </div>
      ))}
    </Grid>
  )
};

export default ProjectsIndexPage;
