/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

export default function LoadingOptions({ buttonHandler, requested }) {
  const buttonListRef = useRef();

  // Disable кнопок во время запроса данных. Когда запрос завершается, disable убирается.

  useEffect(() => {
    if (requested) {
      $(buttonListRef.current).find('BUTTON').each((_, item) => $(item).attr('disabled', 'disabled'));
    } else {
      $(buttonListRef.current).find('BUTTON').each((_, item) => $(item).removeAttr('disabled'));
    }
  }, [requested]);

  //

  return (
    <section className="row justify-content-center loading-options">
      <h2 className="loading-options__headline">Type of loaded info:</h2>
      <ul ref={buttonListRef} className="row justify-content-between loading-options__list" onClick={buttonHandler}>
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
  requested: PropTypes.bool,
};

LoadingOptions.defaultProps = {
  requested: false,
};
