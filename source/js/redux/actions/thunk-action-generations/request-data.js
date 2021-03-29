import { dataRequestSended, dataReceived, dataNotReceived } from '../sync-action/data-request/data-request';

// Запрос данных.
// data.error в том случае, если на фильтр пользователя нечего возвращать. По дефолту возвращается текст, но я решил изменить на свою структуру.

export default function requestData(link) {
  return (dispatch) => {
    dispatch(dataRequestSended());
    setTimeout(() => {
      fetch(link)
        .then((res) => (res.ok || res.status === 404 ? res : Promise.reject(new Error(`A error with ${res.status} code. Try again.`))))
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            return {
              info: { pages: 0, count: 0 },
              results: [],
            };
          }
          return data;
        })
        .then((data) => dispatch(dataReceived(data)))
        .catch((err) => dispatch(dataNotReceived(err.message)));
    }, 5000);
  };
}
