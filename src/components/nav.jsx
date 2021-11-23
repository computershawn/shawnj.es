import React from 'react';
import { createClient } from 'contentful';

import Link from 'next/link'

const Nav = () => {
  return (
    <header>
      <nav>
        {"hi this is the amazing nav | "}
        <Link href="/">
          <a>Home</a>
        </Link>
        {" | "}

        <Link href="/notes">
          <a>notes</a>
        </Link>

      </nav>
      <hr />
    </header>
  )}

export default Nav
