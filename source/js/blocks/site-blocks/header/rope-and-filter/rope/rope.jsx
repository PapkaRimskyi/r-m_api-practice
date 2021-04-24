import React from 'react';
import PropTypes from 'prop-types';

import '../../../../../../img/rope.png';

export default function Rope({ filterStatus, setFilterStatus, filterRef }) {
  // Обработчик для вызова фильтра.

  function ropeHandler(e) {
    e.preventDefault();
    e.target.classList.remove(...Array.from(e.target.classList).filter((item) => item.includes('--filter-toggle')));
    window.$(e.target).addClass(`${e.target.classList.value}--filter-toggle`);
    if (!filterStatus) {
      setFilterStatus((prevState) => !prevState);
    } else {
      window.$(filterRef.current).animate({ top: '-2000%' }, 300, () => setFilterStatus(!filterStatus));
    }
  }

  //

  return (
    <div className="rope">
      <button className="rope__button-rope" type="button" aria-label="Rope for filter" onClick={ropeHandler} />
    </div>
  );
}

Rope.propTypes = {
  filterStatus: PropTypes.bool.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
};
