/* eslint-disable react/no-array-index-key */
import React from 'react';

import defineText from './data/define-text';

export default function CharacterTemplate({ data }) {
  const { name, status, species, type, gender, image, origin, location, episode } = data;

  return (
    <>
      <figure className="col-auto detailed-information__character-photo">
        <img src={image} alt="Character face" />
        <figcaption className="detailed-information__character-name">{name}</figcaption>
      </figure>
      <div className="col-auto col-md-6 detailed-information__character-history">
        {defineText(name, status, gender, species, type, episode).map((text, id) => <p key={`${name}-${id}`} className="detailed-information__character-info">{text}</p>)}
      </div>
    </>
  );
}
