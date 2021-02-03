import React, { useState } from 'react';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';

import dataRequest from '../../../data-request/data-request';

import { CHARACTERS_API, LOCATIONS_API, EPISODES_API } from '../../../variables';

import RickAppear from '../../universal/rick-appear/rick-appear';

export default function Main() {
  const [info, setInfo] = useState({ data: null, infoType: null });

  // Делегирование. У каждой кнопки есть уникальный ID, с помощью которого идёт определение, какие данные стоит подгрузить по клику.

  function loadInfo(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      switch (e.target.id) {
        case 'character':
          dataRequest(CHARACTERS_API, setInfo, 'character');
          break;
        case 'location':
          dataRequest(LOCATIONS_API, setInfo, 'location');
          break;
        case 'episode':
          dataRequest(EPISODES_API, setInfo, 'episode');
          break;
        default:
          break;
      }
    }
  }

  //

  return (
    <main className="container main main--hidden">
      <LoadingOptions buttonHandler={loadInfo} />
      <RickAppear infoType={info.infoType} />
      {info.data && <InfoSection info={info} dataRequest={dataRequest} setInfo={setInfo} />}
    </main>
  );
}
