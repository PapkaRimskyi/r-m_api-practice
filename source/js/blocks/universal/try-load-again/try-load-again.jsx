import React from 'react';
import PropTypes from 'prop-types';

import { mainApiPath } from '../../../variables';

export default function TryLoadAgain({ getData, locationMemo }) {
  // Попробовать загрузить данные снова

  function tryLoadAgain() {
    getData(`${mainApiPath}${locationMemo}`);
  }

  //

  return (
    <button className="try-load-again" onClick={tryLoadAgain} type="button">Попробовать ещё раз</button>
  );
}

TryLoadAgain.propTypes = {
  getData: PropTypes.func.isRequired,
  locationMemo: PropTypes.string.isRequired,
};
