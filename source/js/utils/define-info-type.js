import { TYPE_OF_INFORMATION } from '../variables';

export default function defineInfoType(pathname) {
  const infoTypeRegExp = new RegExp(`${TYPE_OF_INFORMATION.join('|')}`, 'g');
  const result = pathname.match(infoTypeRegExp);
  return result ? result[0] : null;
}
