import React from 'react';
import PropTypes from 'prop-types';

import Rope from '../../universal/rope/rope';

export default function Header({ mainRef }) {
  return (
    <header className="container header">
      <h1 className="header__welcome">
        <span className="header__single-word">Rick</span>&ensp;
        <span className="header__single-word">and</span>&ensp;
        <span className="header__single-word">Morty</span>
      </h1>
      <Rope mainRef={mainRef} />
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
