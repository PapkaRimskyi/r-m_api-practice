import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Requested from './requested/requested';
import Error from './error/error';

export default function LoadStatus({ status }) {
  return (
    <section className={`load-status load-status${classNames(status === 'req' ? '--requested' : '--error')}`}>
      <h2 className="visually-hidden">Simple notification</h2>
      {status === 'req' ? <Requested /> : <Error />}
    </section>
  );
}

LoadStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
