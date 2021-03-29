import { combineReducers } from 'redux';

import dataRequest from './data-request/data-request';

export default combineReducers(
  {
    postData: dataRequest,
  },
);
