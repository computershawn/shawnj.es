import React from 'react';
import Link from 'next/link'

const Card = ({
  title,
  summary,
  thumbnail,
  slug,
  viewProject,
}) => {  
  const cardStyle = {
    width: '30%',
  };

  const cardH4Style = {
    margin: '0.5rem 0;',
  };

  // return (
  //   <a style={cardStyle} href={`/${slug}`} onClick={viewProject}>
  //     <img src={thumbnail} alt={title} style={{ width: "100%" }} />
  //     <div>
  //       <h4 style={cardH4Style}>{title}</h4>
  //       <p>{summary}</p>
  //     </div>
  //   </a>
  // );

  // return (
  //   <Link href={`/${slug}`} passHref>
  //     <a style={cardStyle}>
  //       <div>
  //         <img src={thumbnail} alt={title} style={{ width: "100%" }} />
  //         <div>
  //           <h4 style={cardH4Style}>{title}</h4>
  //           <p>{summary}</p>
  //         </div>
  //       </div>
  //     </a>
  //   </Link>
  // );
  return (
    <Link href="projects/ctrl+w">
      <a>ctrl+w</a>
    </Link>
  );
};

export default Card;
