/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import defineLocationText from './data/get-location-text';
import defineEpisodeText from './data/get-episode-text';

import { TYPE_OF_INFORMATION } from '../../../../../variables';

export default function TableTemplate({ data, infoType }) {
  // Возвращаю подходящие данные

  function getSpecialData() {
    switch (infoType) {
      case TYPE_OF_INFORMATION[1]: {
        const { name, type, dimension, residents } = data;
        return defineLocationText(name, type, dimension, residents);
      }
      case TYPE_OF_INFORMATION[2]: {
        const { name, air_date: airDate, episode, characters } = data;
        return defineEpisodeText(name, airDate, episode, characters);
      }
      default:
        return null;
    }
  }

  //

  return (
    <div className="detailed-information__information-container">
      {getSpecialData().map((text, index) => <p key={`${infoType}-${index}`} className="detailed-information__character-info">{text}</p>)}
    </div>
  );
}

TableTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  infoType: PropTypes.string.isRequired,
};
