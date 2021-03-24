import React from 'react';

import TryLoadAgain from '../try-load-again/try-load-again';
import LoadStatus from './load-status';

// Отдаю нужный компонент в зависимости от статуса req или err.

export default function defineLoadStatus(reqStatus, errStatus, getData, locationMemo) {
  switch (true) {
    case Boolean(reqStatus):
      return <LoadStatus status="req" />;
    case Boolean(errStatus):
      return (
        <>
          <TryLoadAgain getData={getData} locationMemo={locationMemo} />
          <LoadStatus status="err" />
        </>
      );
    default:
      return null;
  }
}
