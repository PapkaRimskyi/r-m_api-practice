/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { requestDetailedData } from '../../../../redux/actions/thunk-action/request-data';

import usePrevious from '../../../../custom-hooks/use-previous';

import LoadStatus from '../../../universal/load-status/load-status';
import CharacterTemplate from './character-template/character-template';
import TableTemplate from './table-template/table-template';

import defineInfoType from '../../../../utils/define-info-type';
import setDocumentTitle from '../../../../utils/set-document-title';
import { TYPE_OF_INFORMATION } from '../../../../variables';

function DetailedInformation({ location, postData, getData }) {
  const { pathname: currentLocation, search } = location;
  const prevLocation = usePrevious(currentLocation);

  const infoType = useMemo(() => defineInfoType(currentLocation), [currentLocation]);
  const abortController = new AbortController();

  // Отправляю запрос

  useEffect(() => {
    getData(search, infoType, abortController.signal);
  }, [`${currentLocation}${search}`]);

  //

  useEffect(() => {
    if (postData.data) {
      setDocumentTitle(`${postData.data.name}`);
    }
  }, [postData.data]);

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
    <section className="detailed-information">
      <h2 className="visually-hidden">Detailed information</h2>
      {prevLocation === currentLocation
        ? postData.requested || postData.err
          ? <LoadStatus requested={postData.requested} err={postData.err} dataRequest={getData} signal={abortController.signal} />
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
    search: PropTypes.string,
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
  getData: requestDetailedData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedInformation);
