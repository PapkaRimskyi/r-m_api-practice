/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingOptions({ buttonHandler }) {
  return (
    <section className="row justify-content-center loading-options">
      <h2 className="loading-options__headline">Type of loaded info:</h2>
      <ul className="row justify-content-between loading-options__list" onClick={buttonHandler}>
        <li className="col loading-options__item">
          <button id="character" className="loading-options__load-button" type="button">Characters</button>
        </li>
        <li className="col loading-options__item">
          <button id="location" className="loading-options__load-button" type="button">Locations</button>
        </li>
        <li className="col loading-options__item">
          <button id="episode" className="loading-options__load-button" type="button">Episodes</button>
        </li>
      </ul>
    </section>
  );
}

LoadingOptions.propTypes = {
  buttonHandler: PropTypes.func.isRequired,
};
