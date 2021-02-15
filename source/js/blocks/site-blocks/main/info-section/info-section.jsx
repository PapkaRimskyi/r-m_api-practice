import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import CharactersTemplate from './characters-template/characters-template';
import TableTemplate from './table-template/table-template';
import Pagination from '../../../universal/pagination/pagination';

import usePrevious from '../../../../custom-hooks/use-previous';

export default function InfoSection({ infoType, postData, getData, pushedLoadButton }) {
  const [page, setPage] = useState(null);
  const infoSection = useRef(null);
  const prevInfoType = usePrevious(infoType);

  // Если пользователь меняет раздел, то происходит сброс счётчика страницы до 1.
  // Если пользователь кликает на кнопку загрузки данных того же раздела, где он сейчас находится, то происходит сброс счётчика страницы до 1.

  useEffect(() => {
    if (prevInfoType !== infoType) {
      setPage(1);
    } else if (Object.prototype.hasOwnProperty.call(pushedLoadButton, 'buttonID')) {
      if (pushedLoadButton.buttonID === prevInfoType) {
        setPage(1);
      }
    }
  }, [infoType, pushedLoadButton]);

  //

  // Если появятся новые данные (postData), то создастся новая версия разметки.

  const infoSectionMarkup = useMemo(() => {
    if (postData.data) {
      if (Object.prototype.hasOwnProperty.call(postData.data, 'results')) {
        const { results, info } = postData.data;
        return (
          <>
            <p className="info-section__total-info">Total {`${infoType}s`}: {info.count}</p>
            {defineTemplate(results)}
            <Pagination infoType={infoType} info={info} page={page} setPage={setPage} getData={getData} infoSection={infoSection} />
          </>
        );
      } if (Object.prototype.hasOwnProperty.call(postData.data, 'error')) {
        const { error } = postData.data;
        return (
          <p className="info-section__total-info info-section__total-info--nothing">{`${error} because nothing was found`}</p>
        );
      }
    }
    return null;
  }, [postData.data]);

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

  return (
    <section ref={infoSection} className="info-section">
      <h2 className="visually-hidden">Received information</h2>
      {infoSectionMarkup}
    </section>
  );
}

InfoSection.propTypes = {
  infoType: PropTypes.string,
  postData: PropTypes.shape({
    data: PropTypes.shape({
      error: PropTypes.string,
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
