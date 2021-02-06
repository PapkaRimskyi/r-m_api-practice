import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CharactersTemplate from './characters-template/characters-template';
import TableTemplate from './table-template/table-template';
import Pagination from '../../../universal/pagination/pagination';

import scrollToElement from '../../../../utils/scroll-to-element';

export default function InfoSection({ infoType, prevInfoType, data, getData }) {
  const { info, results } = data;
  const [page, setPage] = useState(1);
  const infoSection = useRef(null);

  // Сброс значения страницы, если пользователь загрузил другой тип данных.

  useEffect(() => {
    if (prevInfoType !== infoType) {
      setPage(1);
    }
  }, [infoType]);

  //

  // Определяет шаблон разметки, который стоит использовать.

  function defineTemplate() {
    switch (infoType) {
      case 'character':
        return <CharactersTemplate data={results} />;
      case 'location':
      case 'episode':
        return <TableTemplate data={results} infoType={infoType} />;
      default:
        return null;
    }
  }

  //

  // Обработчик страниц. Запрос и получение данных, соответствующие странице.

  function pageHandler(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      getData(`${infoType}?page=${e.target.textContent}`);
      scrollToElement(infoSection.current);
      setPage(+e.target.textContent);
    }
  }

  //

  return (
    <section ref={infoSection} className="info-section">
      <h2 className="visually-hidden">Received information</h2>
      <p className="info-section__total-info">Total {infoType}: {info.count}</p>
      {defineTemplate()}
      <Pagination info={info} page={page} pageHandler={pageHandler} />
    </section>
  );
}

InfoSection.propTypes = {
  infoType: PropTypes.string.isRequired,
  prevInfoType: PropTypes.string,
  data: PropTypes.shape({
    info: PropTypes.shape({
      count: PropTypes.number,
      pages: PropTypes.number,
      next: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      prev: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }),
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getData: PropTypes.func.isRequired,
};

InfoSection.defaultProps = {
  prevInfoType: undefined,
};
