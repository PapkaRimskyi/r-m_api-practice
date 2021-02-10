/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import setInfoType from '../../../redux/actions/sync-action/info-type/info-type';
import dataRequest from '../../../redux/actions/thunk-action-generations/request-data';

import LoadingOptions from './loading-options/loading-options';
import InfoSection from './info-section/info-section';
import RickAppear from '../../universal/rick-appear/rick-appear';

import LoadStatus from '../../universal/load-status/load-status';

function Main({ infoType, changeInfoType, postData, getData }) {
  // Стейт pushedLoadButton будет обновляться при каждом клике на любую из 3 кнопок загрузки данных, потому что значением стейта всегда будет являтся новый объект.
  // Таким образом, если пользователь загрузил данные раздела 'Characters' и решил опять нажать на эту же кнопку, то произойдёт сброс пагинации до 1.

  const [pushedLoadButton, setPushedLoadButton] = useState({});

  //

  // Делегирование. Запускаю экшн, который принимает id нажатой кнопки и отправляет запрос на сервер.

  function loadInfo(e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      setPushedLoadButton({ button: e.target.id });
      changeInfoType(e.target.id);
      getData(e.target.id);
    }
  }

  //

  return (
    <main className="container main main--hidden">
      <LoadingOptions buttonHandler={loadInfo} requested={postData.requested} />
      <RickAppear infoType={infoType} />
      {postData.requested ? <LoadStatus status="requested" /> : postData.err ? <LoadStatus status="error" /> : null}
      <InfoSection infoType={infoType} postData={postData} getData={getData} pushedLoadButton={pushedLoadButton} />
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
