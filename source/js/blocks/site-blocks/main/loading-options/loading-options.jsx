import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { TYPE_OF_INFORMATION } from '../../../../variables';

export default function LoadingOptions() {
  const { search } = useLocation();

  return (
    <section className="row justify-content-center loading-options">
      <h2 className="loading-options__headline">Type of loaded info:</h2>
      <ul className="row justify-content-between loading-options__list">
        {TYPE_OF_INFORMATION.map((type) => (
          <li key={type} className="col loading-options__item">
            <NavLink id={type} to={`/${type}`} className="loading-options__load-button" activeClassName="loading-options__load-button--active" onClick={search === '?page=1' ? ((e) => e.preventDefault()) : null}>{`${type}s`}</NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
