import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TryLoadAgain from './try-load-again/try-load-again';
import ErrorIcon from './error-icon';

import setDocumentTitle from '../../../../utils/set-document-title';

import { BAD_REQUEST, NOT_FOUND } from '../../../../variables';

import '../../../../../img/loading-failed.png';

export default function Error({ errCode, dataRequest, signal }) {
  useEffect(() => {
    setDocumentTitle(defineErrorText());
  }, []);

  // Определяю текст ошибки.

  function defineErrorText() {
    switch (Number(errCode)) {
      case BAD_REQUEST:
        return 'Wrong search query';
      case NOT_FOUND:
        return 'Nothing found';
      default:
        return 'Unexpected error';
    }
  }

  //

  // Отдаю описание ошибки

  function errorHandler() {
    switch (Number(errCode)) {
      case BAD_REQUEST:
      case NOT_FOUND:
        return <p className="load-status__error-description">{defineErrorText()}</p>;
      default:
        return (
          <>
            <p className="load-status__error-description">{defineErrorText()}</p>
            <TryLoadAgain dataRequest={dataRequest} signal={signal} />
          </>
        );
    }
  }

  //

  return (
    <>
      <ErrorIcon />
      {errorHandler()}
    </>
  );
}

Error.propTypes = {
  errCode: PropTypes.string.isRequired,
  dataRequest: PropTypes.func.isRequired,
};
