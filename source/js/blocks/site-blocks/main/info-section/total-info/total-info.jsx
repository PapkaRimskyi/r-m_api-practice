import React from 'react';
import PropTypes from 'prop-types';

export default function TotalInfo({ dataCount, infoType }) {
  return (
    <p className="info-section__total-info">Total {`${infoType}s`}: {dataCount}</p>
  );
}

TotalInfo.propTypes = {
  dataCount: PropTypes.number.isRequired,
  infoType: PropTypes.string.isRequired,
};
