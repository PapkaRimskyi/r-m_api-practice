import React from 'react';
import PropTypes from 'prop-types';

import getSpecialIcon from '../../../../../utils/get-special-icon';

export default function CharactersTemplate({ data }) {
  const { results } = data;
  return (
    <ul className="row row-cols-1 row-cols-md-2 gy-5 info-section__characters-list">
      {
        results.map(({ id, image, name, gender, species, status }) => (
          <li className="info-section__character" key={id}>
            <figure className="info-section__character-photo">
              <img src={`${image}`} alt="Character face" />
              <figcaption id={id} className="info-section__character-name">{name}</figcaption>
            </figure>
            <section className="info-section__character-main-information">
              <h2 className="visually-hidden">Information about character</h2>
              <ul className="info-section__option-list">
                <li className="info-section__option-item">
                  <p className="info-section__character-info">{getSpecialIcon(gender)} - {gender}</p>
                </li>
                <li className="info-section__option-item">
                  <p className="info-section__character-info">{getSpecialIcon(species)} - {species}</p>
                </li>
                <li className="info-section__option-item">
                  <p className="info-section__character-info">{getSpecialIcon(status)} - {status}</p>
                </li>
              </ul>
            </section>
          </li>
        ))
      }
    </ul>
  );
}

CharactersTemplate.propTypes = {
  data: PropTypes.shape({
    info: PropTypes.shape({
      count: PropTypes.number,
      next: PropTypes.string,
      pages: PropTypes.number,
      prev: PropTypes.number,
    }),
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
