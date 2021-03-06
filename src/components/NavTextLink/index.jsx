import React from 'react';
import Link from 'next/link';

import { NavTextLinkContainer } from './styles';

const NavTextLink = ({ text, href, newTab, className }) => {
  const linkIsInternal = !href.startsWith('http');
  const t = newTab ? '_blank' : null;
  const linkContent = linkIsInternal ? (
    <Link href={href}>
      <a className={className}>{text}</a>
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
