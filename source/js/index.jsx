import React from 'react';
import ReactDOM from 'react-dom';
import './jquery';

import '../sass/style.scss';
import '../img/main-background-img.jpg';

import Header from './blocks/header/header';

// fetch('https://rickandmortyapi.com/api/character')
//   .then((response) => response.json())
//   .then((data) => console.log(data));

const root = document.getElementById('root');

function Test() {
  return (
    <Header />
  );
}

ReactDOM.render(<Test />, root);
