import { mainApiPath } from '../../../variables';
import { dataRequestSended, dataReceived, dataNotReceived } from '../sync-action/data-request/data-request';
import setInfoType from '../sync-action/info-type/info-type';

// Раньше setInfoType вызывался отдельно, но так как от infoType зависит форма сортировки и при ошибке запроса данных infoType всё равно бы обновлялся, я подумал, что лучше будет
// если setInfoType будет вызываться вместе с dataReceived.

export default function requestData(type) {
  return (dispatch) => {
    dispatch(dataRequestSended());
    fetch(`${mainApiPath}${type}`)
      .then((res) => (res.ok ? res : Promise.reject(new Error(`A error with ${res.status} code`))))
      .then((response) => response.json())
      .then((data) => {
        dispatch(setInfoType(type));
        dispatch(dataReceived(data));
      })
      .catch((err) => {
        dispatch(dataNotReceived(err.message));
      });
  };
}
