import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Requested from './requested/requested';
import Error from './error/error';

export default function LoadStatus({ reqStatus, errStatus }) {
  // Возвращает нужный компонент.

  function defineLoadStatus() {
    switch (true) {
      case Boolean(reqStatus):
        return <Requested />;
      case Boolean(errStatus):
        return (
          <>
            <Error />
          </>
        );
      default:
        return null;
    }
  }

  //

  return (
    <section className={`load-status load-status${classNames(reqStatus ? '--requested' : '--error')}`}>
      <h2 className="visually-hidden">Simple notification</h2>
      {defineLoadStatus()}
    </section>
  );
}

LoadStatus.propTypes = {
  reqStatus: PropTypes.bool.isRequired,
  errStatus: PropTypes.string,
};

LoadStatus.defaultProps = {
  errStatus: null,
};
