/* eslint-disable no-nested-ternary */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';
import RickAppear from '../../universal/rick-appear/rick-appear';
import DetailedInformation from './detailed-information/detailed-information';

export default function Main() {
  return (
    <main className="container main main--hidden">
      <LoadingOptions />
      <RickAppear />
      <Switch>
        <Route exact path={['/character/detailed/:ID', '/location/detailed/:ID', '/episode/detailed/:ID']} component={DetailedInformation} />
        <Route path={['/character', '/location', '/episode']} component={InfoSection} />
      </Switch>
    </main>
  );
}
