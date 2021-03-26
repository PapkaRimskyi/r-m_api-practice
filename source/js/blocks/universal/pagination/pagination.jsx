/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import PageItem from './page-item/page-item';

import scrollToElement from '../../../utils/scroll-to-element';

import { MAX_PAGE } from '../../../variables';

export default function Pagination({ info, page, setPage, infoSection, currentLocation }) {
  // Заменяет в ссылке номер страницы.

  function replacePageNumber(link, number) {
    return link.replace(/page=(\d+)/, `page=${number}`);
  }

  //

  // Создание пагинации по условию.
  // Если страниц меньше, чем MAX_PAGE в пагинации, то генерирует страницы по MAX_PAGE длине.
  // Если страниц больше, то:
  // 1. Пуш первой страницы.
  // 2. Пуш остальных страниц с проверками логики.
  // 3. Пуш последней страницы.
  // В начале и конце всегда будут кнопки на первую и последнюю страницы.

  function definePages(link, pageCount, currentPage) {
    const pageCollection = [];
    if (MAX_PAGE < pageCount) {
      pageCollection.push(<PageItem key={1} link={replacePageNumber(link, 1)} number={1} currentPage={currentPage} />);
      if (currentPage < 3) {
        if (currentPage === 1) {
          for (let i = currentPage + 1; i <= currentPage + 2; i += 1) {
            pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
          }
        } else {
          for (let i = currentPage; i <= currentPage + 1; i += 1) {
            pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
          }
        }
      } else if (currentPage > 2) {
        if (currentPage !== pageCount) {
          for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
            if (i !== pageCount) {
              pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
            }
          }
        } else {
          for (let i = currentPage - 2; i <= currentPage; i += 1) {
            if (i !== pageCount) {
              pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
            }
          }
        }
      }
      pageCollection.push(<PageItem key={pageCount} link={replacePageNumber(link, pageCount)} number={pageCount} currentPage={currentPage} />);
    } else {
      for (let i = 1; i < MAX_PAGE; i += 1) {
        pageCollection.push(<PageItem key={i} link={replacePageNumber(link, i)} number={i} currentPage={currentPage} />);
      }
    }
    return pageCollection;
  }

  // Обработчик страниц. Запрос и получение данных, соответствующие странице.

  function pageHandler(e) {
    e.preventDefault();
    if (e.target.tagName === 'A' && page !== +e.target.textContent) {
      scrollToElement(infoSection.current);
      setPage(+e.target.textContent);
    }
  }

  //

  return (
    <section className="pagination">
      <h2 className="visually-hidden">Pagination</h2>
      <ul className="row align-items-center pagination__list" onClick={pageHandler}>
        {info.pages > 1 && definePages(currentLocation, info.pages, page).map((pageComponent) => pageComponent)}
      </ul>
    </section>
  );
}

Pagination.propTypes = {
  info: PropTypes.shape({
    count: PropTypes.number,
    pages: PropTypes.number,
  }),
  page: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  currentLocation: PropTypes.string.isRequired,
};

Pagination.defaultProps = {
  info: null,
  page: 1,
};
