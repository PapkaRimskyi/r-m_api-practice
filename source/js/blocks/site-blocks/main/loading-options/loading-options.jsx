/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { CHARACTERS_API, EPISODES_API, LOCATIONS_API, TYPE_OF_INFORMATION } from '../../../../variables';

export default function LoadingOptions({ infoType, setPushedLoadButton, requested, getData }) {
  const buttonListRef = useRef();

  // Disable кнопок во время запроса данных. Когда запрос завершается, disable убирается.

  useEffect(() => {
    $(buttonListRef.current).find('BUTTON').each((_, item) => (requested ? $(item).attr('disabled', 'disabled') : $(item).removeAttr('disabled')));
  }, [requested]);

  //

  // Определение типа ссылки

  function defineHrefForLoadingOptions(id) {
    switch (id) {
      case TYPE_OF_INFORMATION[0]:
        return CHARACTERS_API;
      case TYPE_OF_INFORMATION[1]:
        return LOCATIONS_API;
      case TYPE_OF_INFORMATION[2]:
        return EPISODES_API;
      default:
        return null;
    }
  }

  //

  // Делегирование. Запускаю экшн, который принимает id нажатой кнопки и отправляет запрос на сервер.

  function loadDataByType(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      setPushedLoadButton({ buttonID: e.target.id });
      getData(defineHrefForLoadingOptions(e.target.id), e.target.id, true);
    }
  }

  //

  return (
    <section className="row justify-content-center loading-options">
      <h2 className="loading-options__headline">Type of loaded info:</h2>
      <ul ref={buttonListRef} className="row justify-content-between loading-options__list" onClick={loadDataByType}>
        {TYPE_OF_INFORMATION.map((type) => (
          <li key={type} className="col loading-options__item">
            <button id={type} className={`${classNames('loading-options__load-button', infoType === type ? ' loading-options__load-button--active' : null)}`} type="button">{`${type}s`}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

LoadingOptions.propTypes = {
  infoType: PropTypes.string,
  setPushedLoadButton: PropTypes.func.isRequired,
  requested: PropTypes.bool,
  getData: PropTypes.func.isRequired,
};

LoadingOptions.defaultProps = {
  infoType: null,
  requested: false,
};
