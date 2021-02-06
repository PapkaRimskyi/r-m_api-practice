/* eslint-disable no-underscore-dangle */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducers/main-reducer';

import './jquery';

import '../sass/style.scss';
import '../img/main-background-img.jpg';

import Header from './blocks/site-blocks/header/header';
import Main from './blocks/site-blocks/main/main';
import Footer from './blocks/site-blocks/footer/footer';

const root = document.getElementById('root');
const store = createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

function Index() {
  // Реф используется для монтирования фильтра в main с помощью портала.

  const mainRef = useRef();

  return (
    <Provider store={store}>
      <Header mainRef={mainRef} />
      <Main mainRef={mainRef} />
      <Footer />
    </Provider>
  );
}

ReactDOM.render(<Index />, root);
