import { DATA_REQUESTED, DATA_RECEIVED, DATA_NOT_RECEIVED, RESET } from '../../actions-name/actions-name';

const defaultState = { requested: false, data: null, err: null };

export default function dataRequest(state = defaultState, { type, data, err }) {
  switch (type) {
    case DATA_REQUESTED:
      return { ...state, requested: true, err: null };
    case DATA_RECEIVED:
      return { ...state, requested: false, data };
    case DATA_NOT_RECEIVED:
      return { ...state, requested: false, err };
    case RESET:
      return { ...defaultState };
    default:
      return state;
  }
}
