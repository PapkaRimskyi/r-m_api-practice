import { sendDataRequest, dataReceived, dataNotReceived } from '../data-request/data-request';

import { mainApiPath } from '../../../variables';

// Запрос данных.
// err.code !== 20 - проверка на cancelled (abortController).

export default function requestData(link, signal) {
  return async (dispatch) => {
    try {
      dispatch(sendDataRequest());
      const data = await fetch(`${mainApiPath}/${link}`, { signal });
      if (data.status !== 200) {
        throw new Error(data.status);
      }
      const parsedDataToJSON = await data.json();
      await dispatch(dataReceived(parsedDataToJSON));
    } catch (err) {
      if (err.code !== 20) {
        dispatch(dataNotReceived(err.message));
      }
    }
  };
}
