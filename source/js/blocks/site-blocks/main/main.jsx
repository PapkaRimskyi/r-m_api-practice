import React, { useState } from 'react';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';

import { CHARACTERS_API, LOCATIONS_API, EPISODES_API } from '../../../variables';

export default function Main() {
  const [info, setInfo] = useState({ data: null, infoType: null });

  // Запрос на сервер по определённому apiLink

  function apiRequest(apiLink, infoName) {
    fetch(`${apiLink}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo({ data, infoType: infoName });
      });
  }

  //

  // Делегирование. У каждой кнопки есть уникальный ID с помощью которого идёт определение, какие данные стоит подгрузить по клику.

  function loadInfo(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      switch (e.target.id) {
        case 'characters':
          apiRequest(CHARACTERS_API, 'characters');
          break;
        case 'locations':
          apiRequest(LOCATIONS_API, 'locations');
          break;
        case 'episodes':
          apiRequest(EPISODES_API, 'episodes');
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
      {info.data && <InfoSection info={info} />}
    </main>
  );
}
