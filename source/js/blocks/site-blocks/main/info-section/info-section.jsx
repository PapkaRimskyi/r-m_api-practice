import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CharactersTemplate from './characters-template/characters-template';
import LocationsTemplate from './locations-template/locations-template';
import EpisodesTemplate from './episodes-template/episodes-template';
import Pagination from '../../../universal/pagination/pagination';

import scrollToElement from '../../../../utils/scroll-to-element';

import mainApiPath from '../../../../data-request/main-api-path';

export default function InfoSection({ info, dataRequest, setInfo }) {
  const { data, infoType } = info;
  const [page, setPage] = useState(1);
  const infoSection = useRef(null);

  // Сброс значения страницы, если пользователь загрузил другой тип данных.

  useEffect(() => {
    setPage(1);
  }, [infoType]);

  //

  // Определяет шаблон разметки, который стоит использовать.

  function defineTemplate(renderData, type) {
    switch (type) {
      case 'character':
        return <CharactersTemplate data={renderData} />;
      case 'location':
        return <LocationsTemplate data={renderData} />;
      case 'episode':
        return <EpisodesTemplate data={renderData} />;
      default:
        return null;
    }
  }

  //

  // Обработчик страниц. Запрос и получение данных, соответствующие странице.

  function pageHandler(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      dataRequest(`${mainApiPath}${infoType}?page=${e.target.textContent}`, setInfo, infoType);
      scrollToElement(infoSection.current);
      setPage(+e.target.textContent);
    }
  }

  //

  return (
    <section ref={infoSection} className="info-section">
      <h2 className="visually-hidden">Received information</h2>
      <p className="info-section__total-info">Total {infoType}: {data.info.count}</p>
      {defineTemplate(data, infoType)}
      <Pagination info={data.info} page={page} pageHandler={pageHandler} />
    </section>
  );
}

InfoSection.propTypes = {
  info: PropTypes.shape({
    data: PropTypes.shape({
      info: PropTypes.shape({
        count: PropTypes.number,
        next: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        pages: PropTypes.number,
        prev: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      }),
      results: PropTypes.arrayOf(PropTypes.object),
    }),
    infoType: PropTypes.string,
  }),
  dataRequest: PropTypes.func.isRequired,
  setInfo: PropTypes.func.isRequired,
};

InfoSection.defaultProps = {
  info: PropTypes.shape({
    data: null,
    infoType: null,
  }),
};
