import React from 'react';
import '../../../img/question-mark.png';

export default function Header() {
  return (
    <header className="container-sm container-md container-xl header">
      <h1 className="header__welcome"><span className="header__single-word">Rick</span> <span className="header__single-word">and</span> <span className="header__single-word">Morty</span></h1>
    </header>
  );
}
