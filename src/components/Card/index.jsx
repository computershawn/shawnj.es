import React from 'react';
import Link from 'next/link'

const Card = ({ proj }) => {
  const { thumbnail, title, slug } = proj;

  return (
    <div>
      <Link href="/projects/[slug]" as={`/projects/${slug}`} passHref>
        <a>
          <img src={thumbnail} alt={title} />
        </a>
      </Link>
    </div>
  );
};

export default Card;
