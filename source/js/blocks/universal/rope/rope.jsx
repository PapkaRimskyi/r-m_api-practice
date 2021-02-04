import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import $ from 'jquery';

import Filter from '../../site-blocks/main/filter/filter';

import '../../../../img/rope.png';

export default function Rope({ mainRef }) {
  const [filterStatus, setFilterStatus] = useState(false);
  const filterRef = useRef();

  // Обработчик для вызова фильтра. Для удаления класса не стал использовать jquery вариант, потому что при пустом массиве он удаляет дефолтный класс.

  function ropeHandler(e) {
    e.preventDefault();
    e.target.classList.remove(...Array.from(e.target.classList).filter((item) => item.includes('--filter-toggle')));
    $(e.target).addClass(`${e.target.classList.value}--filter-toggle`);
    if (!filterStatus) {
      setFilterStatus(!filterStatus);
    } else {
      $(filterRef.current).css({ transform: 'translateY(-1000px)' });
      setTimeout(() => setFilterStatus(!filterStatus), 1000);
    }
  }

  //

  return (
    <>
      <div className="rope">
        <button className="rope__button-rope" type="button" aria-label="Rope for filter" onClick={ropeHandler} />
      </div>
      {filterStatus && ReactDOM.createPortal(<Filter filterRef={filterRef} />, mainRef.current)}
    </>
  );
}

Rope.propTypes = {
  mainRef: PropTypes.shape({
    current: PropTypes.node,
  }),
};

Rope.defaultProps = {
  mainRef: PropTypes.shape({
    current: undefined,
  }),
};
