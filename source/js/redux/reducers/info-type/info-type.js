import { SET_INFO_TYPE } from '../../actions-name/actions-name';

export default function setInfoType(state = null, { type, infoType }) {
  switch (type) {
    case SET_INFO_TYPE:
      return infoType;
    default:
      return state;
  }
}
