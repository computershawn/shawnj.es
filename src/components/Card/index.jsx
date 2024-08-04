import React from 'react';
import Link from 'next/link'

const Card = ({ proj }) => {
  const { thumbnail, title, slug } = proj;

  return (
    <div>
      <Link href="[slug]" as={`${slug}`} passHref>
        <img src={thumbnail} alt={title} />
      </Link>
    </div>
  );
};

export default Card;
