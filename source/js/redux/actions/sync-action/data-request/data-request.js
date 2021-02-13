import { DATA_REQUESTED, DATA_RECEIVED, DATA_NOT_RECEIVED, THROW_OFF_ERROR_MESSAGE } from '../../../actions-name/actions-name';

export function dataRequestSended() {
  return {
    type: DATA_REQUESTED,
  };
}

export function dataReceived(data) {
  return {
    type: DATA_RECEIVED,
    data,
  };
}

export function dataNotReceived(err) {
  return {
    type: DATA_NOT_RECEIVED,
    err,
  };
}

export function throwOffErrMessage() {
  return {
    type: THROW_OFF_ERROR_MESSAGE,
  };
}
