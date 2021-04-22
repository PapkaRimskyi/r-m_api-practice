import React from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';

import { mainApiPath } from '../../../../variables';

export default function TryLoadAgain({ dataRequest, signal }) {
  const location = useLocation();

  // Повторный запрос

  function sendRequestAgain(e) {
    e.preventDefault();
    dataRequest(`${mainApiPath}${location.pathname}${location.search}`);
  }

  //

  return (
    <button className="try-load-again" onClick={sendRequestAgain} type="button">Try again</button>
  );
}

TryLoadAgain.propTypes = {
  dataRequest: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};
