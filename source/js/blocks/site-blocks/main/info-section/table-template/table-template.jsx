/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import { location, episode } from './table-properties/table-properties';

import { TYPE_OF_INFORMATION } from '../../../../../variables';

export default function TableTemplate({ data, infoType }) {
  const templateData = getTableMarkup();
  const history = useHistory();

  function trClickHandler(e) {
    if (e.target.closest('TR')) {
      const tr = e.target.closest('TR');
      history.push(`/${infoType}/detailed/${tr.id}`);
    }
  }

  // Возвращает объект, который содержит заранее подготовленные значения для th ячеек и разметку td ячеек на основе infoType.

  function getTableMarkup() {
    switch (infoType) {
      case TYPE_OF_INFORMATION[1]:
        return {
          ...location,
          tableDataMarkup: data.map(({ id, name, type, dimension, residents }) => (
            <tr className="info-section__table-tr" key={id} id={id} tabIndex="0">
              <td className="info-section__table-td">{name}</td>
              <td className="info-section__table-td">{type}</td>
              <td className="info-section__table-td">{dimension}</td>
              <td className="info-section__table-td">{residents.length}</td>
            </tr>
          )),
        };
      case TYPE_OF_INFORMATION[2]:
        return {
          ...episode,
          tableDataMarkup: data.map(({ id, name, air_date: airDate, episode: episodeCode, characters }) => (
            <tr className="info-section__table-tr" key={id} id={id} tabIndex="0">
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
      <table className="info-section__table-info" onClick={trClickHandler}>
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
