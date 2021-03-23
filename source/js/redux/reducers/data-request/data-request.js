import { DATA_REQUESTED, DATA_RECEIVED, DATA_NOT_RECEIVED } from '../../actions-name/actions-name';

const defaultStructure = { requested: false, data: {}, err: null };

export default function dataRequest(state = defaultStructure, { type, data, err }) {
  switch (type) {
    case DATA_REQUESTED:
      return { ...state, requested: true, err: null };
    case DATA_RECEIVED:
      return { ...state, requested: false, data };
    case DATA_NOT_RECEIVED:
      return { ...state, requested: false, err };
    default:
      return state;
  }
}
