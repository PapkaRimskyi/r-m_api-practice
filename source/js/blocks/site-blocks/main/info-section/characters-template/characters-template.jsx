import React from 'react';

import getSpecialIcon from '../../../../../utils/get-special-icon';

export default function CharactersTemplate({ data }) {
  const { results } = data;
  return (
    results.map(({ id, image, name, gender, species, status }) => (
      <li className="info-section__item" key={id}>
        <figure className="info-section__character-photo">
          <img src={`${image}`} alt="Character face" />
          <figcaption id={id} className="info-section__img-description">{name}</figcaption>
        </figure>
        <section className="info-section__main-information">
          <h2 className="visually-hidden">Information about character</h2>
          <ul className="info-section__info-list">
            <li className="info-section__info-item">
              <p className="info-section__character-info">{getSpecialIcon(gender)} - {gender}</p>
            </li>
            <li className="info-section__info-item">
              <p className="info-section__character-info">{getSpecialIcon(species)} - {species}</p>
            </li>
            <li className="info-section__info-item">
              <p className="info-section__character-info">{getSpecialIcon(status)} - {status}</p>
            </li>
          </ul>
        </section>
      </li>
    ))
  );
}
