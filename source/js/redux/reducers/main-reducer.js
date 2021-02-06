import { combineReducers } from 'redux';

import setInfoType from './info-type/info-type';
import dataRequest from './data-request/data-request';

export default combineReducers(
  {
    infoType: setInfoType,
    postData: dataRequest,
  },
);
