import React from 'react';
import PropTypes from 'prop-types';

export default function TotalInfo({ infoType, info }) {
  return (
    <p className="info-section__total-info">Total {`${infoType}s`}: {info.count}</p>
  );
}

TotalInfo.propTypes = {
  infoType: PropTypes.string.isRequired,
  info: PropTypes.shape({
    count: PropTypes.number,
    pages: PropTypes.number,
    next: PropTypes.string,
    prev: PropTypes.string,
  }),
};

TotalInfo.defaultProps = {
  info: undefined,
};
