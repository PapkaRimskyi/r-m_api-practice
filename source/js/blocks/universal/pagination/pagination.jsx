/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import PageItem from './page-item/page-item';

import scrollToElement from '../../../utils/scroll-to-element';

import { MAX_PAGE } from '../../../variables';

export default function Pagination({ infoType, info, page, setPage, getData, infoSection }) {
  // Заменяет в ссылке номер страницы.

  function replacePageNumber(link, number) {
    return link.replace(/page=(\d+)/, `page=${number}`);
  }

  //

  // Создание пагинации по условию. В начале и конце pageCollection всегда будут кнопки на первую и последнюю страницы.

  function definePages(link, pageCount, currentPage) {
    const pageCollection = [];
    if (currentPage === 1) {
      const iterationCount = MAX_PAGE > pageCount ? pageCount : MAX_PAGE;
      for (let i = 1; i < iterationCount; i += 1) {
        pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
      }
      pageCollection.push(<PageItem key={pageCount} link={replacePageNumber(link, pageCount)} number={pageCount} currentPage={currentPage} />);
    } else if (currentPage !== 1 && currentPage !== pageCount) {
      pageCollection.push(<PageItem key={1} link={replacePageNumber(link, 1)} number={1} currentPage={currentPage} />);
      for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
        if (i !== 1 && i !== pageCount) {
          pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
        }
      }
      pageCollection.push(<PageItem key={pageCount} link={replacePageNumber(link, pageCount)} number={pageCount} currentPage={currentPage} />);
    } else {
      if (MAX_PAGE < pageCount) {
        pageCollection.push(<PageItem key={1} link={replacePageNumber(link, 1)} number={1} currentPage={currentPage} />);
      }
      for (let i = currentPage - 2; i <= currentPage; i += 1) {
        pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
      }
    }
    return pageCollection;
  }

  //

  // Обработчик страниц. Запрос и получение данных, соответствующие странице.

  function pageHandler(e) {
    e.preventDefault();
    if (e.target.tagName === 'A' && page !== +e.target.textContent) {
      getData(e.target.href, infoType, false);
      scrollToElement(infoSection.current);
      setPage(+e.target.textContent);
    }
  }

  //

  return (
    <section className="pagination">
      <h2 className="visually-hidden">Pagination</h2>
      <ul className="row align-items-center pagination__list" onClick={pageHandler}>
        {info.pages > 1 && definePages(info.next || info.prev, info.pages, page).map((pageComponent) => pageComponent)}
      </ul>
    </section>
  );
}

Pagination.propTypes = {
  infoType: PropTypes.string.isRequired,
  info: PropTypes.shape({
    count: PropTypes.number,
    pages: PropTypes.number,
    next: PropTypes.string,
    prev: PropTypes.string,
  }).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};
