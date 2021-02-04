import { SET_RECEIVED_DATA } from '../../actions-name/actions-name';

export default function setReceivedData(data) {
  return {
    type: SET_RECEIVED_DATA,
    data,
  };
}
