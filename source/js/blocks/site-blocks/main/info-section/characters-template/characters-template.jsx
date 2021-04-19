import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import getSpecialIcon from '../../../../../utils/get-special-icon';

export default function CharactersTemplate({ data, infoType }) {
  return (
    <ul className="row row-cols-1 row-cols-md-2 gy-5 info-section__characters-list">
      {data.map(({ id, image, name, gender, species, status }) => (
        <li className="info-section__character" key={id}>
          <figure className="info-section__character-photo">
            <img src={`${image}`} alt="Character face" />
            <NavLink to={`/${infoType}/detailed/${id}`} className="info-section__character-name">{name}</NavLink>
          </figure>
          <section className="info-section__character-main-information">
            <h2 className="visually-hidden">Information about character</h2>
            <ul className="info-section__option-list">
              <li className="info-section__option-item">
                <p className="info-section__option-icon">{getSpecialIcon(gender)}</p>
                <p className="info-section__character-info">{`- ${gender}`}</p>
              </li>
              <li className="info-section__option-item">
                <p className="info-section__option-icon">{getSpecialIcon(species)}</p>
                <p className="info-section__character-info">{`- ${species}`}</p>
              </li>
              <li className="info-section__option-item">
                <p className="info-section__option-icon">{getSpecialIcon(status)}</p>
                <p className="info-section__character-info">{`- ${status}`}</p>
              </li>
            </ul>
          </section>
        </li>
      ))}
    </ul>
  );
}

CharactersTemplate.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  infoType: PropTypes.string.isRequired,
};

CharactersTemplate.defaultProps = {
  data: null,
};
