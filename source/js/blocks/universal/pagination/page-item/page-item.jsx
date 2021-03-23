import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function PageItem({ link, number, currentPage }) {
  return (
    <li className="col pagination__item">
      <NavLink to={link} className="pagination__link" activeClassName={link.includes(currentPage) && 'pagination__link--active'}>{number}</NavLink>
    </li>
  );
}

PageItem.propTypes = {
  link: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
