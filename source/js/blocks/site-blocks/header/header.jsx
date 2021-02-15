import React from 'react';

import RopeAndFilter from './rope-and-filter/rope-and-filter';

export default function Header() {
  return (
    <header className="container header">
      <h1 className="header__welcome">
        <span className="header__single-word">Rick</span>&ensp;
        <span className="header__single-word">and</span>&ensp;
        <span className="header__single-word">Morty</span>
      </h1>
      <RopeAndFilter />
    </header>
  );
}
