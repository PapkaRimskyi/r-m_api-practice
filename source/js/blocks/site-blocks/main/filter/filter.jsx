/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import templateData from './template-data/template-data';

import '../../../../../img/chain.png';

export default function Filter({ filterRef, infoType, requested }) {
  useEffect(() => {
    $(filterRef.current).css({ transform: 'translateY(0)' });
  }, []);

  return (
    <section ref={filterRef} className="filter">
      <div className="filter__container">
        <h2 className="filter__headline">Filter</h2>
        <form className="filter__form" method="GET">
          {templateData[infoType].inputs.map((input, index) => (
            <fieldset key={input} className="filter__fieldset">
              <label htmlFor={input.toLowerCase()} className="filter__input-label">{input}:</label>
              <input id={input.toLowerCase()} type="text" className="filter__input" placeholder={templateData[infoType].placeholders[index]} />
            </fieldset>
          ))}
          <button className="filter__confirm-filter" type="button" disabled={requested}>Accept</button>
        </form>
      </div>
    </section>
  );
}

Filter.propTypes = {
  infoType: PropTypes.string.isRequired,
  requested: PropTypes.bool.isRequired,
};
