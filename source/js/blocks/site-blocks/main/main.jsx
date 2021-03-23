/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';
import RickAppear from '../../universal/rick-appear/rick-appear';

export default function Main({ infoType }) {
  return (
    <main className="container main main--hidden">
      <LoadingOptions />
      <RickAppear infoType={infoType} />
      <Switch>
        <Route path={['/character', '/character/?page=:pageNumber']}>
          <InfoSection infoType="character" />
        </Route>
        {/* <Route path="/locations">
          <InfoSection infoType="location" />
        </Route>
        <Route path="/episodes">
          <InfoSection infoType="episode" />
        </Route> */}
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
