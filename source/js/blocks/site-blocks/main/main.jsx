import React, { useState } from 'react';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';

import { CHARACTERS_API, LOCATIONS_API, EPISODES_API } from '../../../variables';

export default function Main() {
  const [info, setInfo] = useState(null);

  function apiRequest(apiLink) {
    fetch(`${apiLink}`)
      .then((response) => response.json())
      .then((data) => setInfo(data));
  }

  function loadInfo(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      switch (e.target.id) {
        case 'characters':
          apiRequest(CHARACTERS_API);
          break;
        case 'locations':
          apiRequest(LOCATIONS_API);
          break;
        case 'episodes':
          apiRequest(EPISODES_API);
          break;
        default:
          break;
      }
    }
  }

  return (
    <main className="container main main--hidden">
      <LoadingOptions buttonHandler={loadInfo} />
      {info && <InfoSection data={info} />}
    </main>
  );
}
