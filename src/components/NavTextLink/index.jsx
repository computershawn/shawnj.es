import React from 'react';
import Link from 'next/link';

import { NavTextLinkContainer } from './styles';

const NavTextLink = ({ text, href, newTab, cl }) => {
  const linkIsInternal = !href.startsWith('http');
  const t = newTab ? '_blank' : null;
  const linkContent = linkIsInternal ? (
    <Link href={href}>
      <span className={cl}>{text}</span>
    </Link>
  ) : (
    <a href={href} target={t}>{text}</a>
  );

  return (
    <NavTextLinkContainer>
      {linkContent}
    </NavTextLinkContainer>
  );
};

export default NavTextLink;
