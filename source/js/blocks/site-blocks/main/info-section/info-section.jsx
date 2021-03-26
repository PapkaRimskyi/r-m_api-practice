/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import requestData from '../../../../redux/actions/thunk-action-generations/request-data';

import usePrevious from '../../../../custom-hooks/use-previous';

import LoadStatus from '../../../universal/load-status/load-status';

import TotalInfo from './total-info/total-info';

import CharactersTemplate from './characters-template/characters-template';
import TableTemplate from './table-template/table-template';

import Pagination from '../../../universal/pagination/pagination';

import { mainApiPath, TYPE_OF_INFORMATION } from '../../../../variables';
import TryLoadAgain from '../../../universal/try-load-again/try-load-again';

function InfoSection({ location, postData, getData }) {
  const [page, setPage] = useState(null);
  const infoSection = useRef(null);
  const { pathname, search } = location;

  const currentLocation = useMemo(() => `${pathname}${search && search}`, [pathname, search]);
  const prevCurrentLocation = usePrevious(currentLocation);
  const infoType = useMemo(() => pathname.replace(/\\|\//g, ''), [pathname]);

  // Изменение currentLocation влечёт отправку запроса.

  useEffect(() => {
    getData(`${mainApiPath}${currentLocation}`, infoType, true);
    setPaginationNumber();
  }, [currentLocation]);

  //

  // Устанавливаю значение пагинации.

  function setPaginationNumber() {
    const matched = search.match(/page=(\d+)/);
    if (matched) {
      setPage(+matched[1]);
    } else {
      setPage(1);
    }
  }

  //

  // Определяю шаблон разметки, который нужно использовать.

  function defineTemplate(results) {
    switch (infoType) {
      case TYPE_OF_INFORMATION[0]:
        return <CharactersTemplate data={results} />;
      case TYPE_OF_INFORMATION[1]:
      case TYPE_OF_INFORMATION[2]:
        return <TableTemplate data={results} infoType={infoType} />;
      default:
        return null;
    }
  }

  //

  // При монтировании происходит проверка: соответствует ли prevCurrentLocation и currentLocation. Проверка всегда будет ложная и пользователь ничего в первый рендер не увидит.
  // После срабатывает useEffect, который отправляет запрос на сервер. Меняется стейт postData.requested. Пользователь уже увидит вращающийся спиннер (на этом этапе сравнение prevCurrentLocation === currentLocation будет верно, но до этой проверки дело не дойдёт)
  // Если будет ошибка, то стейт postData.err изменится и отобразится уже сообщение об ошибке и предложение попробовать снова.
  // Если данные были получены, то стейт postData.requested переходит в false, происходит проверка prevCurrentLocation === currentLocation и компонент выдаёт данные.

  return (
    <section ref={infoSection} className="info-section">
      <h2 className="visually-hidden">Received information</h2>
      {postData.requested || postData.err
        ? (
          <>
            {postData.err && <TryLoadAgain getData={getData} location={currentLocation} />}
            <LoadStatus reqStatus={postData.requested} errStatus={postData.err} />
          </>
        )
        : (
          prevCurrentLocation === currentLocation
            ? (
              <>
                <TotalInfo info={postData.data.info} infoType={infoType} />
                {defineTemplate(postData.data.results)}
                <Pagination info={postData.data.info} page={page} setPage={setPage} infoSection={infoSection} currentLocation={currentLocation} />
              </>
            )
            : null
        )}
    </section>
  );
}

InfoSection.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
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
};

InfoSection.defaultProps = {
  postData: null,
};

function mapStateToProps(state) {
  return {
    postData: state.postData,
  };
}

const mapDispatchToProps = {
  getData: requestData,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoSection);
