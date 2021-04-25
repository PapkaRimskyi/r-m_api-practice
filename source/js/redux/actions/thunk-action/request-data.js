import * as qs from 'query-string';

import { sendDataRequest, dataReceived, dataNotReceived } from '../data-request/data-request';

import { BAD_REQUEST, mainApiPath, OK_STATUS, REQUEST_CANCELLED } from '../../../variables';

// Запрос данных.

export function requestData(link, signal) {
  return async (dispatch) => {
    try {
      dispatch(sendDataRequest());
      const data = await fetch(`${mainApiPath}/${link}`, { signal });
      if (data.status !== OK_STATUS) {
        throw new Error(data.status);
      }
      const parsedDataToJSON = await data.json();
      await dispatch(dataReceived(parsedDataToJSON));
    } catch (err) {
      if (err.code !== REQUEST_CANCELLED) {
        dispatch(dataNotReceived(err.message));
      }
    }
  };
}

//

// Запрос подробной информации

export function requestDetailedData(search, infoType, signal) {
  return async (dispatch) => {
    try {
      const { id } = qs.parse(search);
      if (!id || Number.isNaN(Number(id))) {
        throw new Error(BAD_REQUEST);
      }
      dispatch(requestData(`/${infoType}/${id}`, signal));
    } catch (err) {
      dispatch(dataNotReceived(err.message));
    }
  };
}

//
