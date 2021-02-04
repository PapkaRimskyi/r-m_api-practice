/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import '../../../../../img/chain.png';

export default function Filter({ filterRef }) {
  useEffect(() => {
    $(filterRef.current).css({ transform: 'translateY(0)' });
  }, []);

  return (
    <section ref={filterRef} className="filter">
      <h2 className="filter__headline">Filter</h2>
      <form className="filter__form" method="GET">
        <fieldset className="filter__fieldset">
          <label htmlFor="name" className="filter__input-label">Name:</label>
          <input id="name" type="text" className="filter__input" placeholder="Rick" />
        </fieldset>
        <fieldset className="filter__fieldset">
          <label htmlFor="status" className="filter__input-label">Status:</label>
          <input id="status" type="text" className="filter__input" placeholder="Unknown" />
        </fieldset>
        <fieldset className="filter__fieldset">
          <label htmlFor="species" className="filter__input-label">Species:</label>
          <input id="species" type="text" className="filter__input" placeholder="Human" />
        </fieldset>
        <fieldset className="filter__fieldset">
          <label htmlFor="type" className="filter__input-label">Type:</label>
          <input id="type" type="text" className="filter__input" placeholder="Superhuman" />
        </fieldset>
        <fieldset className="filter__fieldset">
          <label htmlFor="gender" className="filter__input-label">Gender:</label>
          <input id="gender" type="text" className="filter__input" placeholder="Male" />
        </fieldset>
        <button className="filter__confirm-filter" type="button">Accept</button>
      </form>
    </section>
  );
}

Filter.propTypes = {
  filterRef: PropTypes.shape({
    current: PropTypes.node,
  }),
};

Filter.defaultProps = {
  filterRef: PropTypes.shape({
    current: undefined,
  }),
};
