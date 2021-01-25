import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export default function PageItem({ number, currentPage }) {
  return (
    <li className="col pagination__item">
      <button className={classNames('pagination__button', currentPage === number ? ' pagination__button--active' : null)} type="button" disabled={currentPage === number}>{number}</button>
    </li>
  );
}

PageItem.propTypes = {
  number: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
