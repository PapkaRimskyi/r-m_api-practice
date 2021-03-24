/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import requestData from '../../../../redux/actions/thunk-action-generations/request-data';

import usePrevious from '../../../../custom-hooks/use-previous';

import defineLoadStatus from '../../../universal/load-status/define-load-status';

import CharactersTemplate from './characters-template/characters-template';
import TableTemplate from './table-template/table-template';

import TotalInfo from './total-info/total-info';
import Pagination from '../../../universal/pagination/pagination';

import { mainApiPath, TYPE_OF_INFORMATION } from '../../../../variables';

function InfoSection({ location, postData, getData }) {
  const [page, setPage] = useState(null);
  const infoSection = useRef(null);
  const { pathname, search } = location;
  const prevPathName = usePrevious(pathname);

  const locationMemo = useMemo(() => `${pathname}${search && search}`, [pathname, search]);
  const infoTypeMemo = useMemo(() => pathname.replace(/\\|\//g, ''), [pathname]);

  // При изменении locationMemo, происходит запрос на сервер

  useEffect(() => {
    getData(`${mainApiPath}${locationMemo}`, infoTypeMemo, true);
    setPaginationNumber();
  }, [locationMemo]);

  //

  // Мемоизирую данные запроса

  const resultsMemo = useMemo(() => {
    if (postData.data && Object.keys(postData.data).length) {
      const { results } = postData.data;
      return results;
    }
    return null;
  }, [postData.data]);

  const infoMemo = useMemo(() => {
    if (postData.data && Object.keys(postData.data).length) {
      const { info } = postData.data;
      return info;
    }
    return null;
  }, [postData.data]);

  //

  // Устанавливаю значение страницы

  function setPaginationNumber() {
    const matched = search.match(/page=(\d+)/);
    if (matched) {
      setPage(+matched[1]);
    } else {
      setPage(1);
    }
  }

  //

  // // Определяет шаблон разметки, который стоит использовать.

  function defineTemplate(results) {
    switch (infoTypeMemo) {
      case TYPE_OF_INFORMATION[0]:
        return <CharactersTemplate data={results} />;
      case TYPE_OF_INFORMATION[1]:
      case TYPE_OF_INFORMATION[2]:
        return <TableTemplate data={results} infoType={infoTypeMemo} />;
      default:
        return null;
    }
  }

  // //

  return (
    <section ref={infoSection} className="info-section">
      <h2 className="visually-hidden">Received information</h2>
      {defineLoadStatus(postData.requested, postData.err, getData, locationMemo)
        || (
          prevPathName === pathname
            ? (
              <>
                <TotalInfo info={infoMemo} infoType={infoTypeMemo} />
                {defineTemplate(resultsMemo)}
                <Pagination info={infoMemo} page={page} setPage={setPage} infoSection={infoSection} />
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
