/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import getText from './data/get-character-text';

export default function CharacterTemplate({ data }) {
  const { name, status, species, type, gender, image, origin, location, episode } = data;
  return (
    <>
      <figure className="col-auto detailed-information__character-photo">
        <img src={image} alt="Character face" />
        <figcaption className="detailed-information__character-name">{name}</figcaption>
      </figure>
      <div className="col-auto col-md-6 detailed-information__character-history">
        {getText(name, status, gender, species, type, origin, location, episode).map((text, id) => <p key={`${name}-${id}`} className="detailed-information__character-info">{text}</p>)}
      </div>
    </>
  );
}

CharacterTemplate.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    type: PropTypes.string,
    gender: PropTypes.string,
    image: PropTypes.string,
    origin: PropTypes.objectOf(PropTypes.string),
    location: PropTypes.objectOf(PropTypes.string),
    episode: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
