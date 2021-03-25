import React from 'react';
import PropTypes from 'prop-types';

export default function TotalInfo({ info, infoType }) {
  return (
    <p className="info-section__total-info">Total {`${infoType}s`}: {info.count}</p>
  );
}

TotalInfo.propTypes = {
  info: PropTypes.shape({
    count: PropTypes.number,
  }),
  infoType: PropTypes.string.isRequired,
};

TotalInfo.defaultProps = {
  info: {
    count: 0,
  },
};
