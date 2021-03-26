/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import templateData from './template-data/template-data';

import { mainApiPath } from '../../../variables';

import '../../../../img/chain.png';

export default function Filter({ infoType, requested, setFilterStatus, filterRef, getData }) {
  const history = useHistory();
  // Анимация после монтирования фильтра.

  useEffect(() => {
    $(filterRef.current).animate({ top: '50%' }, 1000);
  }, []);

  //

  // На основе данных из фильтра, который пользователь ввёл, создаю url ссылку для запроса на сервер.

  function buildingUrlByFilterData(formData) {
    let filterUrl = '';
    for (const [key, value] of formData) {
      if (value.trim()) {
        if (value.split(' ').length > 1) {
          filterUrl += `${filterUrl ? '&' : '?page=1&'}${key}=${value.trim().toLowerCase().split(' ').filter((word) => word).join('&')}`;
        } else {
          filterUrl += `${filterUrl ? '&' : '?page=1&'}${key}=${value.toLowerCase().trim()}`;
        }
      }
    }
    history.push(`/${infoType}/${filterUrl}`);
    return `${mainApiPath}/${infoType}/${filterUrl}`;
  }

  //

  // Обработчик сабмита формы.

  function submitFormHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target).entries();
    $(filterRef.current).animate({ top: '-2000%' }, 300, () => setFilterStatus(false));
    getData(buildingUrlByFilterData(formData));
  }

  //

  return (
    <section ref={filterRef} className="filter">
      <div className="filter__container">
        <h2 className="filter__headline">Filter</h2>
        <form className="filter__form" method="GET" onSubmit={submitFormHandler}>
          {templateData[infoType].inputs.map((input, index) => (
            <fieldset key={input} className="filter__fieldset">
              <label htmlFor={input.toLowerCase()} className="filter__input-label">{input}:</label>
              <input id={input.toLowerCase()} type="text" name={input.toLowerCase()} className="filter__input" placeholder={templateData[infoType].placeholders[index]} />
            </fieldset>
          ))}
          <button className="filter__confirm-filter" type="submit" disabled={requested}>Accept</button>
        </form>
      </div>
    </section>
  );
}

Filter.propTypes = {
  infoType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  requested: PropTypes.bool.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};
