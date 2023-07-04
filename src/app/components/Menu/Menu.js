import React from 'react';
import { bool } from 'prop-types';
import Link from 'next/link';

import { StyledMenu } from './Menu.styled';

const Menu = ({ open, setOpen }) => {
  const toggleMenu = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <StyledMenu open={open}>
      <ul>
        <li>
          <Link onClick={toggleMenu} href="/">
            Illustrationer
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={toggleMenu}>
            Om mig
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={toggleMenu}>
            Kontakt
          </Link>
        </li>
      </ul>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};
export default Menu;
