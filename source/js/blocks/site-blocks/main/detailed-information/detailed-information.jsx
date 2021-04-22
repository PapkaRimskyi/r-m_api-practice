/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import requestData from '../../../../redux/actions/thunk-action/request-data';

import usePrevious from '../../../../custom-hooks/use-previous';

import LoadStatus from '../../../universal/load-status/load-status';
import CharacterTemplate from './character-template/character-template';
import TableTemplate from './table-template/table-template';

import defineInfoType from '../../../../utils/define-info-type';
import { TYPE_OF_INFORMATION } from '../../../../variables';

function DetailedInformation({ location, postData, getData }) {
  const { pathname } = location;
  const currentLocation = useMemo(() => `${pathname}`, [pathname]);
  const prevLocation = usePrevious(currentLocation);

  const infoType = useMemo(() => defineInfoType(pathname), [currentLocation]);

  const abortController = new AbortController();

  // Отправляю запрос

  useEffect(() => {
    const number = currentLocation.match(/\d/gi).join('');
    getData(`/${infoType}/${number}`);
  }, [currentLocation]);

  //

  function defineTemplate(results) {
    switch (infoType) {
      case TYPE_OF_INFORMATION[0]:
        return <CharacterTemplate data={results} />;
      case TYPE_OF_INFORMATION[1]:
      case TYPE_OF_INFORMATION[2]:
        return <TableTemplate data={results} infoType={infoType} />;
      default:
        return null;
    }
  }

  return (
    <section className="row gx-5 detailed-information">
      <h2 className="visually-hidden">Detailed information</h2>
      {prevLocation === currentLocation
        ? postData.requested || postData.err
          ? <LoadStatus requested={postData.requested} errStatus={postData.err} dataRequest={getData} signal={abortController.signal} />
          : (
            defineTemplate(postData.data)
          )
        : null}
    </section>
  );
}

DetailedInformation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  postData: PropTypes.shape({
    requested: PropTypes.bool.isRequired,
    err: PropTypes.string,
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
