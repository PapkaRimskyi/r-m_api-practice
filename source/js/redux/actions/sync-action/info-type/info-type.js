import { SET_INFO_TYPE } from '../../../actions-name/actions-name';

export default function setInfoType(infoType) {
  return {
    type: SET_INFO_TYPE,
    infoType,
  };
}
