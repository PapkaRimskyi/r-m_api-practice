import React, { useState, useRef, useMemo } from 'react';

import { Route, useLocation } from 'react-router-dom';

import Rope from './rope/rope';
import Filter from './filter/filter';

import defineInfoType from '../../../../utils/define-info-type';

export default function RopeAndFilter() {
  const [filterStatus, setFilterStatus] = useState(false);
  const filterRef = useRef();

  const { pathname } = useLocation();

  const infoType = useMemo(() => defineInfoType(pathname), [pathname]);

  return (
    <>
      <Rope filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterRef={filterRef} />
      <Route exact path={['/character', '/location', '/episode']}>
        {filterStatus && <Filter infoType={infoType} setFilterStatus={setFilterStatus} filterRef={filterRef} />}
      </Route>
    </>
  );
}
