import { dataRequestSended, dataReceived, dataNotReceived, throwOffErrMessage } from '../sync-action/data-request/data-request';
import setInfoType from '../sync-action/info-type/info-type';

// Раньше setInfoType вызывался отдельно, но так как от infoType зависит форма сортировки и при ошибке запроса данных infoType всё равно бы обновлялся, я подумал, что лучше будет
// если setInfoType будет вызываться вместе с dataReceived.

export default function requestData(link, type, withSetInfoType) {
  return (dispatch) => {
    dispatch(throwOffErrMessage());
    dispatch(dataRequestSended());
    setTimeout(() => {
      fetch(link)
        .then((res) => (res.ok || res.status === 404 ? res : Promise.reject(new Error(`A error with ${res.status} code. Try again.`))))
        .then((response) => response.json())
        .then((data) => {
          if (withSetInfoType) {
            dispatch(setInfoType(type));
          }
          dispatch(dataReceived(data));
        })
        .catch((err) => {
          dispatch(dataNotReceived(err.message));
        });
    }, 5000);
  };
}
