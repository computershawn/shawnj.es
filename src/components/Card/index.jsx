import React from 'react';
import Link from 'next/link'

const CardIndexPage = ({ project }) => {
  const { id, thumbnail, title, summary } = project;

  const cardStyle = {
    width: '360px',
  };

  const cardH4Style = {
    margin: '0.5rem 0',
  };

  return (
    <div style={cardStyle}>
      <Link key={id} href="/projects/[id]" as={`/projects/${id}`}>
        <a>
          <img src={thumbnail} alt={title} style={{ width: "100%" }} />
          {/* <div>
            <h4 style={cardH4Style}>{title}</h4>
            <p>{summary}</p>
          </div> */}
        </a>
      </Link>
    </div>
  );
};

export default CardIndexPage;
