import { DATA_REQUESTED, DATA_RECEIVED, DATA_NOT_RECEIVED, THROW_OFF_ERROR_MESSAGE } from '../../actions-name/actions-name';

const defaultStructure = { requested: false, data: null, err: null };

export default function dataRequest(state = defaultStructure, { type, data, err }) {
  switch (type) {
    case DATA_REQUESTED:
      return { ...state, requested: true };
    case DATA_RECEIVED:
      return { ...state, requested: false, data };
    case DATA_NOT_RECEIVED:
      return { ...state, requested: false, err };
    case THROW_OFF_ERROR_MESSAGE:
      return { ...state, err: null };
    default:
      return state;
  }
}
