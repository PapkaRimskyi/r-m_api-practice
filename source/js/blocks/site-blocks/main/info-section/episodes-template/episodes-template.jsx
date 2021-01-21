import React from 'react';

export default function EpisodesTemplate({ data }) {
  const { results } = data;
  return (
    results.map(({ id, name, air_date: airDate, episode, characters }) => (
      <li className="info-section__item info-section__item--episode" id={id}>
        <ul className="info-section__episode-info-list">
          <li className="info-section__episode-info">Episode name - {name}</li>
          <li className="info-section__episode-info">Date when it came out - {airDate}</li>
          <li className="info-section__episode-info">Episode code - {episode}</li>
          <li className="info-section__episode-info">There were {characters.length} characte{characters.length > 1 ? 'rs' : 'r'} in the episode</li>
        </ul>
      </li>
    ))
  );
}
