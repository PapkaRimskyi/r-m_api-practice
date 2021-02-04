import { SET_RECEIVED_DATA } from '../../actions-name/actions-name';

export default function receivedData(state = null, { type, data }) {
  switch (type) {
    case SET_RECEIVED_DATA:
      return { ...data };
    default:
      return state;
  }
}
