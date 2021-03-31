/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import requestData from '../../../../redux/actions/thunk-action-generations/request-data';
import { mainApiPath, TYPE_OF_INFORMATION } from '../../../../variables';

import CharacterTemplate from './character-template/character-template';

import LoadStatus from '../../../universal/load-status/load-status';
import TryLoadAgain from '../../../universal/try-load-again/try-load-again';

import usePrevious from '../../../../custom-hooks/use-previous';

function DetailedInformation({ location, postData, getData }) {
  const currentLocation = useMemo(() => `${location.pathname}`, [location.pathname]);
  const prevCurrentLocation = usePrevious(currentLocation);

  // Мемоизирую regExp выражение.

  const infoTypeRegExp = useMemo(() => new RegExp(`${TYPE_OF_INFORMATION.join('|')}`, 'g'), []);

  //

  // Определяю тип и мемоизирую при первом монтировании компонента.

  const infoType = useMemo(() => currentLocation.match(infoTypeRegExp)[0], [currentLocation]);

  //

  // Отправляю запрос

  useEffect(() => {
    const number = currentLocation.match(/\d/gi).join('');
    getData(`${mainApiPath}/${infoType}/${number}`);
  }, [currentLocation]);

  //

  function defineTemplate(results) {
    switch (infoType) {
      case TYPE_OF_INFORMATION[0]:
        return <CharacterTemplate data={results} />;
      case TYPE_OF_INFORMATION[1]:
      case TYPE_OF_INFORMATION[2]:
        return null;
      default:
        return null;
    }
  }

  return (
    <section className="row gx-5 detailed-information">
      <h2 className="visually-hidden">Detailed information</h2>
      {postData.requested || postData.err
        ? (
          <>
            {postData.err && <TryLoadAgain getData={getData} location={currentLocation} />}
            <LoadStatus reqStatus={postData.requested} errStatus={postData.err} />
          </>
        )
        : (
          prevCurrentLocation === currentLocation
            ? (
              defineTemplate(postData.data)
            )
            : null
        )}
    </section>
  );
}

DetailedInformation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  getData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    postData: state.postData,
  };
}

const mapDispatchToProps = {
  getData: requestData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedInformation);
