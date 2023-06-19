import React from 'react';
import { bool } from 'prop-types';
import Link from 'next/link';

import { StyledMenu } from './Menu.styled';

const Menu = ({ open, setOpen }) => {
  return (
    <StyledMenu open={open}>
      <ul>
        <li>
          <Link href="/">Illustrationer</Link>
        </li>
        <li>
          <Link href="/about">Om mig</Link>
        </li>
        <li>
          <Link href="/contact">Kontakt</Link>
        </li>
      </ul>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};
export default Menu;
