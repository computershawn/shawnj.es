import { useContext } from 'react';
import { createClient } from 'contentful';

import { store } from '../providers/store';

const loadCurrentProject = ({ id }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  });

  client
    .getEntry(id, {
      content_type: 'work',
      select: 'fields.projectContent',
    })
    .then((ent) => {
      dispatch({
        type: 'SET_PROJECTS_DATA',
        payload: {
          id,
          content: ent.fields.projectContent,
        },
      });
    })
    .catch(console.error);
};

export { loadCurrentProject };
