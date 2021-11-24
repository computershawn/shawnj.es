import React from 'react';

import Card from '../src/components/Card';

export default () => {
  const gridWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <p>hello world</p>
    // <main style={mainStyle}>
    //   <div style={gridWrapperStyle}>
    //     {
    //       projectsMetadata.map((entry, index) => (
    //         <Card
    //           key={entry.title}
    //           title={entry.title}
    //           summary={entry.summary}
    //           thumbnail={entry.thumbnail}
    //           slug={entry.slug}
    //           viewProject={(e) => viewProject(e, index)}
    //           index={index}
    //         />
    //       ))
    //     }
    //   </div>
    // </main>
)}
