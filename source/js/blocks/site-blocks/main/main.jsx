import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoadingOptions from './loading-options/loading-options';
import RickAppear from './rick-appear/rick-appear';
import DetailedInformation from './detailed-information/detailed-information';
import InfoSection from './info-section/info-section';

export default function Main() {
  return (
    <main className="container main main--hidden">
      <LoadingOptions />
      <RickAppear />
      <Switch>
        <Route exact path={['/character/detailed', '/location/detailed', '/episode/detailed']} component={DetailedInformation} />
        <Route exact path={['/character', '/location', '/episode']} component={InfoSection} />
      </Switch>
    </main>
  );
}
