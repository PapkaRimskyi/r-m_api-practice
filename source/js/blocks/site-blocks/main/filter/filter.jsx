/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';

import templateData from './template-data/template-data';

import { mainApiPath } from '../../../../variables';

import requestData from '../../../../redux/actions/thunk-action-generations/request-data';

import '../../../../../img/chain.png';

function Filter({ filterRef, infoType, requested, setFilterStatus, getData }) {
  useEffect(() => {
    $(filterRef.current).css({ transform: 'translateY(0)' });
  }, []);

  function buildingtUrlByFilterData(formData) {
    let urlResult = '';
    for (const [key, value] of formData) {
      if (value.trim()) {
        if (value.split(' ').length > 1) {
          urlResult += `${urlResult ? '&' : '?'}${key}=${value.trim().toLowerCase().split(' ').filter((word) => word).join('&')}`;
        } else {
          urlResult += `${urlResult ? '&' : '?'}${key}=${value.toLowerCase().trim()}`;
        }
      }
    }
    return `${mainApiPath}${infoType}/${urlResult}`;
  }

  function submitFormHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target).entries();
    getData(buildingtUrlByFilterData(formData), infoType, false);
    setFilterStatus(false);
  }

  return (
    <section ref={filterRef} className="filter">
      <div className="filter__container">
        <h2 className="filter__headline">Filter</h2>
        <form className="filter__form" method="GET" onSubmit={submitFormHandler}>
          {templateData[infoType].inputs.map((input, index) => (
            <fieldset key={input} className="filter__fieldset">
              <label htmlFor={input.toLowerCase()} className="filter__input-label">{input}:</label>
              <input id={input.toLowerCase()} type="text" name={input.toLowerCase()} className="filter__input" placeholder={templateData[infoType].placeholders[index]} />
            </fieldset>
          ))}
          <button className="filter__confirm-filter" type="submit" disabled={requested}>Accept</button>
        </form>
      </div>
    </section>
  );
}

Filter.propTypes = {
  infoType: PropTypes.string.isRequired,
  requested: PropTypes.bool.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getData: requestData,
};

export default connect(null, mapDispatchToProps)(Filter);
