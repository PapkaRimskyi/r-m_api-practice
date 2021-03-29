import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function PageItem({ link, number, currentPage }) {
  return (
    <li className="col pagination__item">
      <NavLink to={link} className="pagination__link" activeClassName={`${number === currentPage && 'pagination__link--active'}`} onClick={number === currentPage ? ((e) => e.preventDefault()) : null}>{number}</NavLink>
    </li>
  );
}

PageItem.propTypes = {
  link: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
