import React from 'react';
import PropTypes from 'prop-types';

export default function TryLoadAgain({ getData, link }) {
  // Попробовать загрузить данные снова

  function tryLoadAgain() {
    getData(link);
  }

  //

  return (
    <button className="try-load-again" onClick={tryLoadAgain} type="button">Попробовать ещё раз</button>
  );
}

TryLoadAgain.propTypes = {
  getData: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};
