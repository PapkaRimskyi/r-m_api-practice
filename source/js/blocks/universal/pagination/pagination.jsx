/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import PageItem from './page-item/page-item';

import { MAX_PAGE } from '../../../variables';

export default function Pagination({ info, page, pageHandler }) {
  // Создание пагинации по условию. В начале и конце pageCollection всегда будут кнопки на первую страницу и последнюю.

  function definePages(pageCount, currentPage) {
    const pageCollection = [];
    if (currentPage === 1) {
      for (let i = 1; i < MAX_PAGE; i += 1) {
        pageCollection.push(<PageItem key={i} number={i} currentPage={currentPage} />);
      }
      pageCollection.push(<PageItem key={pageCount} number={pageCount} currentPage={currentPage} />);
    } else if (currentPage !== 1 && currentPage !== pageCount) {
      pageCollection.push(<PageItem key={1} number={1} currentPage={currentPage} />);
      for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
        if (i !== 1 && i !== pageCount) {
          pageCollection.push(<PageItem key={i} number={i} currentPage={currentPage} />);
        }
      }
      pageCollection.push(<PageItem key={pageCount} number={pageCount} currentPage={currentPage} />);
    } else {
      pageCollection.push(<PageItem key={1} number={1} currentPage={currentPage} />);
      for (let i = currentPage - 2; i <= currentPage; i += 1) {
        pageCollection.push(<PageItem key={i} number={i} currentPage={currentPage} />);
      }
    }
    return pageCollection;
  }

  //

  return (
    <section className="pagination">
      <h2 className="visually-hidden">Pagination</h2>
      <ul className="row align-items-center pagination__list" onClick={pageHandler}>
        {definePages(info.pages, page, pageHandler).map((pageComponent) => pageComponent)}
      </ul>
    </section>
  );
}

Pagination.propTypes = {
  info: PropTypes.shape({
    count: PropTypes.number,
    pages: PropTypes.number,
    next: PropTypes.string,
    prev: PropTypes.string,
  }).isRequired,
  page: PropTypes.number.isRequired,
  pageHandler: PropTypes.func.isRequired,
};
