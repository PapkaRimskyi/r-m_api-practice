import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TryLoadAgain from '../try-load-again/try-load-again';

import ErrorIcon from './error-icon';

import setDocumentTitle from '../../../../utils/set-document-title';

import '../../../../../img/loading-failed.png';

export default function Error({ errCode, dataRequest, signal }) {
  useEffect(() => {
    setDocumentTitle(defineErrorText());
  }, []);

  // Определяю текст ошибки.

  function defineErrorText() {
    switch (errCode) {
      case '400':
        return 'Wrong search query';
      case '404':
        return 'Nothing found';
      default:
        return 'Unexpected error';
    }
  }

  //

  // Отдаю описание ошибки

  function errorHandler() {
    switch (errCode) {
      case '400':
      case '404':
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
