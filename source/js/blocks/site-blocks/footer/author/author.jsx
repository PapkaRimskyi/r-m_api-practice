import React from 'react';

export default function Author() {
  return (
    <section className="row author">
      <h2 className="visually-hidden">Link to author profile in github</h2>
      <a rel="noreferrer" href="https://github.com/PapkaRimskyi" className="col-auto author__link" target="_blank" title="Link to my github">PR</a>
    </section>
  );
}
