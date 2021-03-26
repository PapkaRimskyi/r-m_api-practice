import { dataRequestSended, dataReceived, dataNotReceived } from '../sync-action/data-request/data-request';

// Запрос данных

export default function requestData(link) {
  return (dispatch) => {
    dispatch(dataRequestSended());
    setTimeout(() => {
      fetch(link)
        .then((res) => (res.ok || res.status === 404 ? res : Promise.reject(new Error(`A error with ${res.status} code. Try again.`))))
        .then((response) => response.json())
        .then((data) => dispatch(dataReceived(data)))
        .catch((err) => dispatch(dataNotReceived(err.message)));
    }, 5000);
  };
}
