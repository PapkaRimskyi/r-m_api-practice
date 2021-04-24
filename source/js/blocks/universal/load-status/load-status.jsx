import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loading from './loading/loading';
import Error from './error/error';

export default function LoadStatus({ requested, err, dataRequest, signal }) {
  // Определяю, какой компонент вернуть.

  function defineStatus() {
    switch (true) {
      case Boolean(requested):
        return <Loading />;
      case Boolean(err):
        return <Error errCode={err} dataRequest={dataRequest} signal={signal} />;
      default:
        return null;
    }
  }

  //

  return (
    <section className={`load-status load-status${classNames(requested ? '--requested' : '--error')}`}>
      <h2 className="visually-hidden">Simple notification</h2>
      {defineStatus()}
    </section>
  );
}

LoadStatus.propTypes = {
  requested: PropTypes.bool.isRequired,
  err: PropTypes.string,
  dataRequest: PropTypes.func.isRequired,
};

LoadStatus.defaultProps = {
  err: null,
};
