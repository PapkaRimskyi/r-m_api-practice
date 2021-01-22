import React from 'react';
import PropTypes from 'prop-types';

import CharactersTemplate from './characters-template/characters-template';
import LocationsTemplate from './locations-template/locations-template';
import EpisodesTemplate from './episodes-template/episodes-template';

export default function InfoSection({ info }) {
  const { data, infoType } = info;
  // Определяет шаблон разметки, который стоит использовать.

  function defineTemplate(renderData, type) {
    switch (type) {
      case 'characters':
        return <CharactersTemplate data={renderData} />;
      case 'locations':
        return <LocationsTemplate data={renderData} />;
      case 'episodes':
        return <EpisodesTemplate data={renderData} />;
      default:
        return null;
    }
  }

  //

  return (
    <section className="info-section">
      <h2 className="visually-hidden">Полученная информация</h2>
      <p className="info-section__total-info">Total {infoType}: {data.info.count}</p>
      {defineTemplate(data, infoType)}
    </section>
  );
}

InfoSection.propTypes = {
  info: PropTypes.shape({
    data: PropTypes.shape({
      info: PropTypes.shape({
        count: PropTypes.number,
        next: PropTypes.string,
        pages: PropTypes.number,
        prev: PropTypes.number,
      }),
      results: PropTypes.arrayOf(PropTypes.object),
    }),
    infoType: PropTypes.string,
  }),
};

InfoSection.defaultProps = {
  info: PropTypes.shape({
    data: null,
    infoType: null,
  }),
};
