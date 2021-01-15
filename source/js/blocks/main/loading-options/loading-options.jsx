import React from 'react';

export default function LoadingOptions() {
  return (
    <section className="row justify-content-center loading-options">
      <h2 className="loading-options__headline">Type of loaded info:</h2>
      <ul className="row justify-content-between loading-options__list">
        <li className="col loading-options__item">
          <button className="loading-options__load-button" type="button">Characters</button>
        </li>
        <li className="col loading-options__item">
          <button className="loading-options__load-button" type="button">Locations</button>
        </li>
        <li className="col loading-options__item">
          <button className="loading-options__load-button" type="button">Episodes</button>
        </li>
      </ul>
    </section>
  );
}
