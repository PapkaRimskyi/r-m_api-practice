import { combineReducers } from 'redux';

import setInfoType from './info-type/info-type';
import setReceivedData from './received-data/received-data';

export default combineReducers(
  {
    infoType: setInfoType,
    receivedData: setReceivedData,
  },
);
