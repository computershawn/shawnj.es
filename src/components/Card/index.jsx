import React from 'react';
import Link from 'next/link'

const cardOverlayStyle = {
  background: 'rgb(0, 0, 0, 0.36)',
  color: '#fefefe',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
}

const captionStyle = {
  margin: '0 1.5rem',
  fontSize: '1.5rem',
};

// TODO: Add hover state CSS. The card's overlay
// including text should fade in on hover

const Card = ({ proj }) => {
  const { thumbnail, title, slug } = proj;

  return (
    <div>
      <div style={cardOverlayStyle}>
        <caption style={captionStyle}>{title}</caption>
      </div>
      <Link href="[slug]" as={`${slug}`} passHref>
        <img src={thumbnail} alt={title} />
      </Link>
    </div>
  );
};

export default Card;
