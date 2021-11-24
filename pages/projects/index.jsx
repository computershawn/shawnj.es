/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

import { useContext } from 'react';
import { store } from '../../src/providers/store';

export default () => {
  const globalState = useContext(store);
  const { state: { projectsMetadata } } = globalState;

  return (
    <div sx={{variant: 'containers.page'}}>
      <h1>werk</h1>
      <div sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        {projectsMetadata.map(note => (
          <div sx={{width: '33%', p: 2}}>
            <Link key={note.id} href="/projects/[id]" as={`/projects/${note.id}`}>
              <a sx={{textDecoration: 'none', cursor: 'pointer'}}>
                <div sx={{variant: 'containers.card',}}>
                  <strong>{note.title}</strong>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// !!!
// IN THE CASE OF FUNCTIONAL COMPONENTS LIKE Card THAT WILL
// REPLACE THE ABOVE Link COMPONENT: onClick, href and ref
// need  to be passed to the DOM element for proper handling
//
// const MyButton = React.forwardRef(({ onClick, href }, ref) => {
//   return (
//     <a href={href} onClick={onClick} ref={ref}>
//       Click Me
//     </a>
//   )
// })