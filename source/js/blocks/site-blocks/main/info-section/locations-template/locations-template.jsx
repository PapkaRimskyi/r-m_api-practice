import React from 'react';

export default function LocationsTemplate({ data }) {
  const { results } = data;
  return (
    results.map(({ id, name, type, dimension, residents }) => (
      <li className="info-section__item info-section__item--location" id={id}>
        <ul className="info-section__location-info-list">
          <li className="info-section__location-info">Location name - {name}</li>
          <li className="info-section__location-info">Type - {type}</li>
          <li className="info-section__location-info">Dimension - {dimension}</li>
          <li className="info-section__location-info">The location was visited by {residents.length} characte{residents.length > 1 ? 'rs' : 'r'}</li>
        </ul>
      </li>
    ))
  );
}
