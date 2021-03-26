import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import requestData from '../../../../redux/actions/thunk-action-generations/request-data';

import Rope from '../../../universal/rope/rope';
import Filter from '../../../universal/filter/filter';

import { TYPE_OF_INFORMATION } from '../../../../variables';

function RopeAndFilter({ requested, getData }) {
  const [filterStatus, setFilterStatus] = useState(false);
  const filterRef = useRef();

  const { pathname } = useLocation();
  const clearedPathName = pathname.replace(/\\|\//g, '');

  // Определяю, находится ли пользователь в одном из TYPE_OF_INFORMATION разделе. Мемоизирую результат.
  // На основе этого результата рендерится нужный Filter.

  const infoType = useMemo(() => TYPE_OF_INFORMATION.find((type) => type === clearedPathName) || false, [pathname]);

  //

  return (
    <>
      <Rope infoType={infoType} filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterRef={filterRef} />
      {filterStatus && infoType && <Filter infoType={infoType} requested={requested} setFilterStatus={setFilterStatus} filterRef={filterRef} getData={getData} />}
    </>
  );
}

RopeAndFilter.propTypes = {
  requested: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    requested: state.postData.requested,
  };
}

const mapDispatchToProps = {
  getData: requestData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RopeAndFilter);
