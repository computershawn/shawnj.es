import React from 'react';
import Link from 'next/link'

const Card = ({ proj }) => {
  const { id, thumbnail, title } = proj;

  return (
    <div>
      <Link href="/projects/[id]" as={`/projects/${id}`} passHref>
        <a>
          <img src={thumbnail} alt={title} />
        </a>
      </Link>
    </div>
  );
};

export default Card;
