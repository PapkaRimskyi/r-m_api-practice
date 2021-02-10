import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CharactersTemplate from './characters-template/characters-template';
import TableTemplate from './table-template/table-template';
import Pagination from '../../../universal/pagination/pagination';

import scrollToElement from '../../../../utils/scroll-to-element';
import usePrevious from '../../../../custom-hooks/use-previous';

export default function InfoSection({ infoType, postData, getData, pushedLoadButton }) {
  const [page, setPage] = useState(null);
  const infoSection = useRef(null);
  const prevInfoType = usePrevious(infoType);

  // Если появятся новые данные (postData), колбэк создаст новую версию разметки.

  const infoSectionMarkup = useCallback(() => {
    if (postData.data && Object.prototype.hasOwnProperty.call(postData.data, 'results')) {
      const { results, info } = postData.data;
      return (
        <>
          <h2 className="visually-hidden">Received information</h2>
          <p className="info-section__total-info">Total {`${infoType}s`}: {info.count}</p>
          {defineTemplate(results)}
          <Pagination info={info} page={page} pageHandler={pageHandler} />
        </>
      );
    }
    return null;
  }, [postData.data]);

  // Если пользователь меняет раздел, то происходит сброс счётчика страницы до 1.
  // Если пользователь кликает на кнопку загрузки данных того же раздела, где он сейчас находится, то происходит сброс счётчика страницы до 1.

  useEffect(() => {
    if (prevInfoType !== infoType) {
      setPage(1);
    } else if (typeof pushedLoadButton === 'object' && Object.prototype.hasOwnProperty.call(pushedLoadButton, 'button')) {
      if (pushedLoadButton.button === prevInfoType) {
        setPage(1);
      }
    }
  }, [infoType, pushedLoadButton]);

  //

  // Определяет шаблон разметки, который стоит использовать.

  function defineTemplate(results) {
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
      {infoSectionMarkup()}
    </section>
  );
}

InfoSection.propTypes = {
  infoType: PropTypes.string,
  postData: PropTypes.shape({
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
    }),
    requested: PropTypes.bool.isRequired,
    err: PropTypes.string,
  }),
  getData: PropTypes.func.isRequired,
  pushedLoadButton: PropTypes.objectOf(PropTypes.string),
};

InfoSection.defaultProps = {
  postData: null,
  infoType: null,
  pushedLoadButton: PropTypes.object,
};
