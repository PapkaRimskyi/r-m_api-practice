import React from 'react';
import CharactersTemplate from './characters-template/characters-template';

export default function InfoSection({ data }) {
  return (
    <section className="info-section">
      <h2 className="visually-hidden">Полученная информация</h2>
      <ul className="row row-cols-1 row-cols-md-2 gy-5 info-section__list">
        <CharactersTemplate data={data} />
      </ul>
    </section>
  );
}
