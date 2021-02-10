import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Rope from '../../universal/rope/rope';

export default function Header() {
  const headerRef = useRef();
  return (
    <header ref={headerRef} className="container header">
      <h1 className="header__welcome">
        <span className="header__single-word">Rick</span>&ensp;
        <span className="header__single-word">and</span>&ensp;
        <span className="header__single-word">Morty</span>
      </h1>
      <Rope headerRef={headerRef} />
    </header>
  );
}

Header.propTypes = {
  mainRef: PropTypes.shape({
    current: PropTypes.node,
  }),
};

Header.defaultProps = {
  mainRef: PropTypes.shape({
    current: undefined,
  }),
};
