import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import setInfoType from '../../../redux/actions/sync-action/info-type/info-type';
import dataRequest from '../../../redux/actions/thunk-action-generations/request-data';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';
import RickAppear from '../../universal/rick-appear/rick-appear';

import usePrevious from '../../../custom-hooks/use-previous';

// import { CHARACTERS_API, LOCATIONS_API, EPISODES_API } from '../../../variables';

function Main({ mainRef, infoType, changeInfoType, postData, getData }) {
  const prevInfoType = usePrevious(infoType);
  const { data } = postData;

  useEffect(() => {
    if (infoType && infoType !== prevInfoType) {
      getData(infoType);
    }
  }, [infoType]);

  // Делегирование. Запускаю экшн, который принимает id нажатой кнопки.

  function loadInfo(e) {
    e.preventDefault();
    changeInfoType(e.target.id);
  }

  //

  // Реагирует на статусы fetch'а.

  function getInfoSection() {
    const { requested, err } = postData;
    if (requested) {
      return <div>Загрузка...</div>;
    } if (err) {
      return <div>Ошибка!</div>;
    } if (prevInfoType === infoType) {
      return data && Object.prototype.hasOwnProperty.call(data, 'results') && <InfoSection infoType={infoType} prevInfoType={prevInfoType} data={data} getData={getData} />;
    }
    return null;
  }

  //

  return (
    <main ref={mainRef} className="container main main--hidden">
      <LoadingOptions buttonHandler={loadInfo} />
      <RickAppear infoType={infoType} />
      {getInfoSection()}
    </main>
  );
}

Main.propTypes = {
  infoType: PropTypes.string,
  changeInfoType: PropTypes.func.isRequired,
  postData: PropTypes.shape({
    data: PropTypes.shape({
      info: PropTypes.shape({
        count: PropTypes.number,
        pages: PropTypes.number,
        next: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        prev: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      }),
      results: PropTypes.arrayOf(PropTypes.object),
    }),
    requested: PropTypes.bool.isRequired,
    err: PropTypes.string,
  }),
  getData: PropTypes.func.isRequired,
};

Main.defaultProps = {
  infoType: null,
  postData: null,
};

function mapStateToProps(state) {
  return {
    infoType: state.infoType,
    postData: state.postData,
  };
}

const mapDispatchToProps = {
  changeInfoType: setInfoType,
  getData: dataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
