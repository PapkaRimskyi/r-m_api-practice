import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import requestData from '../../../../redux/actions/thunk-action-generations/request-data';

import Rope from '../../../universal/rope/rope';
import Filter from '../../../universal/filter/filter';

function RopeAndFilter({ infoType, requested, getData }) {
  const [filterStatus, setFilterStatus] = useState(false);
  const filterRef = useRef();

  return (
    <>
      <Rope infoType={infoType} filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterRef={filterRef} />
      {filterStatus && <Filter infoType={infoType} requested={requested} setFilterStatus={setFilterStatus} filterRef={filterRef} getData={getData} />}
    </>
  );
}

RopeAndFilter.propTypes = {
  infoType: PropTypes.string,
  requested: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};

RopeAndFilter.defaultProps = {
  infoType: null,
};

function mapStateToProps(state) {
  return {
    infoType: state.infoType,
    requested: state.postData.requested,
  };
}

const mapDispatchToProps = {
  getData: requestData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RopeAndFilter);
