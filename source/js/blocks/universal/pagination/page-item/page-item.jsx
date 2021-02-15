import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export default function PageItem({ link, number, currentPage }) {
  return (
    <li className="col pagination__item">
      <a href={link} className={classNames('pagination__link', currentPage === number ? ' pagination__link--active' : null)}>{number}</a>
    </li>
  );
}

PageItem.propTypes = {
  link: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
