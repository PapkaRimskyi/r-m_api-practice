import React from 'react';
import PropTypes from 'prop-types';

export default function LocationsTemplate({ data }) {
  const { results } = data;
  return (
    <div className="row gy-5 info-section__table-container">
      <table className="info-section__table-info">
        <tbody>
          <tr>
            <th className="info-section__table-th">Location name</th>
            <th className="info-section__table-th">Type</th>
            <th className="info-section__table-th">Dimension</th>
            <th className="info-section__table-th">Location visitors</th>
          </tr>
          {results.map(({ id, name, type, dimension, residents }) => (
            <tr key={id}>
              <td className="info-section__table-td">{name}</td>
              <td className="info-section__table-td">{type}</td>
              <td className="info-section__table-td">{dimension}</td>
              <td className="info-section__table-td">{residents.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

LocationsTemplate.propTypes = {
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
