import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import Filter from '../../site-blocks/main/filter/filter';

import '../../../../img/rope.png';

export default function Rope() {
  const [filterStatus, setFilterStatus] = useState(false);
  const filterRef = useRef();

  function ropeHandler(e) {
    e.preventDefault();
    if (!filterStatus) {
      $(e.target).toggleClass('filter-active');
      setFilterStatus(!filterStatus);
    } else {
      $(filterRef.current).css({ transform: 'translateY(-1000px)' });
      setTimeout(() => setFilterStatus(!filterStatus), 1000);
    }
  }

  return (
    <>
      <div className="rope">
        <button className="rope__button-rope" type="button" aria-label="Rope for filter" onClick={ropeHandler} />
      </div>
      {filterStatus && ReactDOM.createPortal(<Filter filterRef={filterRef} />, document.querySelector('.main'))}
    </>
  );
}
