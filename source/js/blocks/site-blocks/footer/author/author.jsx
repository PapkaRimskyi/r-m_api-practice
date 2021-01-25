import React from 'react';

export default function Author() {
  return (
    <section className="row justify-content-center author">
      <h2 className="visually-hidden">Link to author profile in github</h2>
      <a rel="noreferrer" href="https://github.com/PapkaRimskyi" className="col-auto author__link" target="_blank" title="Ссылка на мой github">PR</a>
    </section>
  );
}
