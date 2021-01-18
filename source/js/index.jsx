import React from 'react';
import ReactDOM from 'react-dom';
import './jquery';

import '../sass/style.scss';
import '../img/main-background-img.jpg';

import Header from './blocks/site-blocks/header/header';
import Main from './blocks/site-blocks/main/main';
import Footer from './blocks/site-blocks/footer/footer';

const root = document.getElementById('root');

function Index() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

ReactDOM.render(<Index />, root);
