/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';
import RickAppear from '../../universal/rick-appear/rick-appear';
import DetailedInformation from './detailed-information/detailed-information';

export default function Main({ infoType }) {
  return (
    <main className="container main main--hidden">
      <LoadingOptions />
      <RickAppear infoType={infoType} />
      <Switch>
        <Route exact path={['/character/detailed/:ID', '/location/detailed/:ID', '/episode/detailed/:ID']} component={DetailedInformation} />
        <Route path={['/character', '/location', '/episode']} component={InfoSection} />
      </Switch>
    </main>
  );
}

Main.propTypes = {
  infoType: PropTypes.string,
};

Main.defaultProps = {
  infoType: null,
};
