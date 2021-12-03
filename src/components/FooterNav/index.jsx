import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import HomeIcon from '../../assets/home-icon.svg';

// `onClick`, `href`, and `ref` need to be passed
// to the DOM element for proper handling
const HomeButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <HomeIcon />
    </a>
  );
});

const StyledFooterNav = styled.footer`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 2.5rem;
    height: 2.5rem;
  }
  `;

const FooterNav = () => {
  return (
    <StyledFooterNav>
      <div>
        <Link href="/" passHref>
          <HomeButton />
        </Link>
      </div>
    </StyledFooterNav>
  )
}

export default FooterNav
