import React from 'react';
import PropTypes from 'prop-types';

import '../../../../img/rope.png';

export default function Rope({ infoType, filterStatus, setFilterStatus, filterRef }) {
  // Обработчик для вызова фильтра. Для удаления класса не стал использовать jquery вариант, потому что при пустом массиве он удаляет дефолтный класс.

  function ropeHandler(e) {
    e.preventDefault();
    e.target.classList.remove(...Array.from(e.target.classList).filter((item) => item.includes('--filter-toggle')));
    $(e.target).addClass(`${e.target.classList.value}--filter-toggle`);
    if (infoType) {
      if (!filterStatus) {
        setFilterStatus(!filterStatus);
      } else {
        $(filterRef.current).animate({ top: '-2000%' }, 300, () => setFilterStatus(!filterStatus));
      }
    }
  }

  //

  return (
    <div className="rope">
      <button className="rope__button-rope" type="button" aria-label="Rope for filter" title={!infoType ? 'Choose section firstly' : null} onClick={ropeHandler} />
    </div>
  );
}

Rope.propTypes = {
  infoType: PropTypes.string,
  filterStatus: PropTypes.bool.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
};

Rope.defaultProps = {
  infoType: null,
};
