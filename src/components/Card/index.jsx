import React from 'react';
import Link from 'next/link'
import styled from 'styled-components';

const StyledCard = styled.div`
  div {
    background: rgb(0, 0, 0, 0.8);
    color: #fefefe;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
    transition: opacity 400ms;

    &:hover {
      opacity: 1;
    }
  }
`;

const captionStyle = {
  margin: '0 1.5rem',
  fontSize: '1.5rem',
};

const Card = ({ proj }) => {
  const { thumbnail, title, slug } = proj;

  return (
    <StyledCard>
      <Link href="[slug]" as={`${slug}`} passHref>
        <>
          <div>
            <caption style={captionStyle}>{title}</caption>
          </div>
          <img src={thumbnail} alt={title} />
        </>
      </Link>
    </StyledCard>
  );
};

export default Card;
