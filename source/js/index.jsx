/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './redux/reducers/main-reducer';

import './jquery';

import Header from './blocks/site-blocks/header/header';
import Main from './blocks/site-blocks/main/main';
import Footer from './blocks/site-blocks/footer/footer';

import '../sass/style.scss';
import '../img/gif/portal-gif.gif';
import '../img/main-background-img.jpg';

const root = document.getElementById('root');
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function Index() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Header />
        <Main />
        <Footer />
      </HashRouter>
    </Provider>
  );
}

ReactDOM.render(<Index />, root);
