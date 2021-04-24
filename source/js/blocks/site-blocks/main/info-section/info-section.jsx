/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import * as qs from 'query-string';

import { connect } from 'react-redux';
import { requestData } from '../../../../redux/actions/thunk-action/request-data';
import { dataReset } from '../../../../redux/actions/data-request/data-request';

import usePrevious from '../../../../custom-hooks/use-previous';

import LoadStatus from '../../../universal/load-status/load-status';
import TotalInfo from './total-info/total-info';
import CharactersTemplate from './characters-template/characters-template';
import TableTemplate from './table-template/table-template';
import Pagination from '../../../universal/pagination/pagination';

import setDocumentTitle from '../../../../utils/set-document-title';
import defineInfoType from '../../../../utils/define-info-type';

import { TYPE_OF_INFORMATION } from '../../../../variables';

function InfoSection({ location, postData, getData, resetData }) {
  const [page, setPage] = useState(null);
  const { pathname, search } = location;
  const infoType = useMemo(() => defineInfoType(pathname), [pathname]);
  const prevInfoType = usePrevious(infoType);

  const currentLocation = useMemo(() => `/${infoType}${search || '?page=1'}`, [pathname, search]);

  const abortController = new AbortController();

  // Изменение currentLocation влечёт отправку запроса.

  useEffect(() => {
    getData(currentLocation, abortController.signal);
    setDocumentTitle(`Information about ${infoType}s`);
    setPaginationNumber();
    return () => {
      abortController.abort();
      resetData();
    };
  }, [currentLocation]);

  //

  // Устанавливаю значение пагинации.

  function setPaginationNumber() {
    const { page: queryPage } = qs.parse(search);
    if (queryPage) {
      setPage(+queryPage);
    } else {
      setPage(1);
    }
  }

  //

  // Определяю шаблон разметки, который нужно использовать.

  function defineTemplate(results) {
    switch (infoType) {
      case TYPE_OF_INFORMATION[0]:
        return <CharactersTemplate data={results} infoType={infoType} />;
      case TYPE_OF_INFORMATION[1]:
      case TYPE_OF_INFORMATION[2]:
        return <TableTemplate data={results} infoType={infoType} />;
      default:
        return null;
    }
  }

  //

  /*
    В redux сторе я использую одно хранилище для 3 секций (characters, locations, episodes).
    Если пользователь сначала загрузит characters, а потом решит перейти на locations, то выдаст ошибку.
    Причина ошибки - при смене роутинга происходит рендер. Сброс эффекта в useEffect срабатывает в начале следующего useEffect, поэтому resetData не срабатывает и остаются
    старые данные, которые в рендере вызовут ошибку, потому что шаблон разметки разный и требует разных полей.
    Для этого я использую проверку prevInfoType === infoType. Если будет изменён роут с characters на locations, то в первый рендер ничего не покажет.
    Потом произойдёт сброс данных и запрос новых.
    Можно было бы для каждого раздела создать свой раздел с данными, но тогда пришлось бы расширять redux store и писать лишнюю логику.
  */
  return (
    <section className="info-section">
      <h2 className="visually-hidden">Received information</h2>
      {prevInfoType === infoType
        ? postData.requested || postData.err
          ? <LoadStatus requested={postData.requested} err={postData.err} dataRequest={getData} signal={abortController.signal} />
          : (
            <>
              <TotalInfo dataCount={postData.data.info.count} infoType={infoType} />
              {defineTemplate(postData.data.results)}
              {postData.data.info.pages > 1 && <Pagination info={postData.data.info} page={page} setPage={setPage} currentLocation={currentLocation} />}
            </>
          )
        : null}
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
  resetData: PropTypes.func.isRequired,
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
  resetData: dataReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoSection);
