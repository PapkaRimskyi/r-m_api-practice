import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import { location, episode } from './table-properties/table-properties';

export default function TableTemplate({ data, infoType }) {
  const templateData = useMemo(() => defineProperties(), [data, infoType]);

  // Возвращает объект, который содержит заранее подготовленные значения для th ячеек и разметку td ячеек на основе infoType.

  function defineProperties() {
    switch (infoType) {
      case 'location':
        return {
          ...location,
          tableDataMarkup: data.map(({ id, name, type, dimension, residents }) => (
            <tr key={id}>
              <td className="info-section__table-td">{name}</td>
              <td className="info-section__table-td">{type}</td>
              <td className="info-section__table-td">{dimension}</td>
              <td className="info-section__table-td">{residents.length}</td>
            </tr>
          )),
        };
      case 'episode':
        return {
          ...episode,
          tableDataMarkup: data.map(({ id, name, air_date: airDate, episode: episodeCode, characters }) => (
            <tr key={id}>
              <td className="info-section__table-td">{name}</td>
              <td className="info-section__table-td">{airDate}</td>
              <td className="info-section__table-td">{episodeCode}</td>
              <td className="info-section__table-td">{characters.length}</td>
            </tr>
          )),
        };
      default:
        return null;
    }
  }

  //

  return (
    <div className="row gy-5 info-section__table-container">
      <table className="info-section__table-info">
        <tbody>
          <tr>
            {templateData.tableHeaders.map((text) => <th key={text} className="info-section__table-th">{text}</th>)}
          </tr>
          {templateData.tableDataMarkup}
        </tbody>
      </table>
    </div>
  );
}

TableTemplate.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  infoType: PropTypes.string.isRequired,
};
