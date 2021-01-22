import React from 'react';
import PropTypes from 'prop-types';

export default function EpisodesTemplate({ data }) {
  const { results } = data;
  return (
    <div className="row gy-5 info-section__table-container">
      <table className="info-section__table-info">
        <tbody>
          <tr>
            <th className="info-section__table-th">Ep.name</th>
            <th className="info-section__table-th">Release date</th>
            <th className="info-section__table-th">Ep.code</th>
            <th className="info-section__table-th">Characters in episode</th>
          </tr>
          {results.map(({ id, name, air_date: airDate, episode, characters }) => (
            <tr key={id}>
              <td className="info-section__table-td">{name}</td>
              <td className="info-section__table-td">{airDate}</td>
              <td className="info-section__table-td">{episode}</td>
              <td className="info-section__table-td">{characters.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

EpisodesTemplate.propTypes = {
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
