import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import $ from 'jquery';

import Filter from '../../site-blocks/main/filter/filter';

import '../../../../img/rope.png';

function Rope({ mainRef, infoType }) {
  const [filterStatus, setFilterStatus] = useState(false);
  const filterRef = useRef();

  // Обработчик для вызова фильтра. Для удаления класса не стал использовать jquery вариант, потому что при пустом массиве он удаляет дефолтный класс.

  function ropeHandler(e) {
    e.preventDefault();
    e.target.classList.remove(...Array.from(e.target.classList).filter((item) => item.includes('--filter-toggle')));
    $(e.target).addClass(`${e.target.classList.value}--filter-toggle`);
    if (infoType) {
      if (!filterStatus) {
        setFilterStatus(!filterStatus);
      } else {
        $(filterRef.current).css({ transform: 'translateY(-1000px)' });
        setTimeout(() => setFilterStatus(!filterStatus), 1000);
      }
    }
  }

  //

  return (
    <>
      <div className="rope">
        <button className="rope__button-rope" type="button" aria-label="Rope for filter" title={!infoType ? 'Choose section firstly' : null} onClick={ropeHandler} />
      </div>
      {filterStatus && ReactDOM.createPortal(<Filter filterRef={filterRef} infoType={infoType} />, mainRef.current)}
    </>
  );
}

Rope.propTypes = {
  infoType: PropTypes.string,
};

Rope.defaultProps = {
  infoType: null,
};

function mapStateToProps(state) {
  return {
    infoType: state.infoType,
  };
}

export default connect(mapStateToProps)(Rope);
