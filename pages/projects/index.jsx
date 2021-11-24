/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useContext } from 'react';

import Card from '../../src/components/Card';
import { store } from '../../src/providers/store';

export default () => {
  const globalState = useContext(store);
  const { state: { projectsMetadata } } = globalState;

  const gridWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div sx={{variant: 'containers.page'}}>
      <h1>werk</h1>
      <div style={gridWrapperStyle}>
        {projectsMetadata.map(proj => <Card project={proj} />)}
      </div>
    </div>
  )
};
