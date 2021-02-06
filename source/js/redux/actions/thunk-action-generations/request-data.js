import { mainApiPath } from '../../../variables';
import { dataRequestSended, dataReceived, dataNotReceived } from '../sync-action/data-request/data-request';

export default function requestData(type) {
  return (dispatch) => {
    dispatch(dataRequestSended());
    fetch(`${mainApiPath}${type}`)
      .then(
        (response) => response.json(),
        (error) => dispatch(dataNotReceived(error)),
      )
      .then((data) => dispatch(dataReceived(data)));
  };
}
