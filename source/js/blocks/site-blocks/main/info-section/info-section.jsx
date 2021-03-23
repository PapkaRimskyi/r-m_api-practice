/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import requestData from '../../../../redux/actions/thunk-action-generations/request-data';

import LoadStatus from '../../../universal/load-status/load-status';

import CharactersTemplate from './characters-template/characters-template';
import TableTemplate from './table-template/table-template';

import TotalInfo from './total-info/total-info';
import Pagination from '../../../universal/pagination/pagination';

import { mainApiPath, TYPE_OF_INFORMATION } from '../../../../variables';
import TryLoadAgain from '../../../universal/try-load-again/try-load-again';

function InfoSection({ infoType, postData, getData }) {
  const [page, setPage] = useState(null);
  const infoSection = useRef(null);
  const { pathname, search } = useLocation();
  const locationMemo = useMemo(() => `${pathname}${search && search}`, [pathname, search]);

  // При изменении locationMemo, происходит запрос на сервер

  useEffect(() => {
    getData(`${mainApiPath}${locationMemo}`, infoType, true);
    setPaginationNumber();
  }, [locationMemo]);

  //

  // Мемоизирую данные запроса

  const resultsMemo = useMemo(() => {
    const { results } = postData.data;
    return results;
  }, [postData.data]);

  const infoMemo = useMemo(() => {
    const { info } = postData.data;
    return info;
  }, [postData.data]);

  function setPaginationNumber() {
    const matched = search.match(/page=(\d+)/);
    if (matched) {
      setPage(+matched[1]);
    } else {
      setPage(1);
    }
  }

  //

  // При изменении infoType, происходит отправка запроса

  // useEffect(() => {
  //   getData(`${mainApiPath}${infoType}`, infoType, true);
  //   setPage(1);
  // }, [infoType]);

  //

  // Мемоизирую части разметки.

  // const totalInfo = useMemo(() => {
  //   if (postData.data) {
  //     if (Object.prototype.hasOwnProperty.call(postData.data, 'info')) {
  //       const { info } = postData.data;
  //       return (
  //         <p className="info-section__total-info">Total {`${infoType}s`}: {info.count}</p>
  //       );
  //     }
  //   }
  //   return null;
  // }, [postData.data]);

  // const pagination = useMemo(() => {
  //   if (postData.data) {
  //     if (Object.prototype.hasOwnProperty.call(postData.data, 'info')) {
  //       const { info } = postData.data;
  //       return (
  //         <Pagination infoType={infoType} info={info} page={page} setPage={setPage} getData={getData} infoSection={infoSection} />
  //       );
  //     }
  //   }
  //   return null;
  // }, [postData.data, page]);

  // const infoSectionMarkup = useMemo(() => {
  //   if (postData.data) {
  //     if (Object.prototype.hasOwnProperty.call(postData.data, 'results')) {
  //       const { results } = postData.data;
  //       return (
  //         <>
  //           {defineTemplate(results)}
  //         </>
  //       );
  //     } if (Object.prototype.hasOwnProperty.call(postData.data, 'error')) {
  //       const { error } = postData.data;
  //       return (
  //         <p className="info-section__total-info info-section__total-info--nothing">{`${error} because nothing was found`}</p>
  //       );
  //     }
  //   }
  //   return null;
  // }, [postData.data]);

  // //

  // // Определяет шаблон разметки, который стоит использовать.

  // function defineTemplate(results) {
  //   switch (infoType) {
  //     case TYPE_OF_INFORMATION[0]:
  //       return <CharactersTemplate data={results} />;
  //     case TYPE_OF_INFORMATION[1]:
  //     case TYPE_OF_INFORMATION[2]:
  //       return <TableTemplate data={results} infoType={infoType} />;
  //     default:
  //       return null;
  //   }
  // }

  // //

  return (
    <section ref={infoSection} className="info-section">
      <h2 className="visually-hidden">Received information</h2>
      {postData.requested
        ? <LoadStatus status="requested" />
        : (
          infoMemo && resultsMemo
            ? (
              <>
                <TotalInfo info={infoMemo} infoType={infoType} />
                <CharactersTemplate data={resultsMemo} />
                <Pagination locationMemo={locationMemo} info={infoMemo} page={page} setPage={setPage} getData={getData} infoSection={infoSection} />
              </>
            )
            : null
        )}
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
};

InfoSection.defaultProps = {
  postData: null,
  infoType: null,
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
