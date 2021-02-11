import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Вместо передачи данных универсальному компоненту, я решил сделать Requested и Error отдельными, так как в будущем, возможно, их можно будет переиспользовать по отдельности друг от друга.

import Requested from './requested/requested';
import Error from './error/error';

export default function LoadStatus({ status, errMessage }) {
  return (
    <section className={`load-status load-status${classNames(status === 'requested' ? '--requested' : '--error')}`}>
      <h2 className="visually-hidden">Simple notification</h2>
      {status === 'requested' ? <Requested /> : <Error errMessage={errMessage} />}
    </section>
  );
}

LoadStatus.propTypes = {
  status: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
};

LoadStatus.defaultProps = {
  errMessage: null,
};
