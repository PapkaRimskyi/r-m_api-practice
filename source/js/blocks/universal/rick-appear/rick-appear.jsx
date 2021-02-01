import $ from 'jquery';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import getRandomNumber from '../../../utils/get-random-number';

import monologData from './monolog-data/monolog-data';

import '../../../../img/load-info-delay.png';

export default function RickAppear({ infoType }) {
  const [timerID, setTimerID] = useState(null);
  const rickAppearRef = useRef(null);

  // Проверка на infoType нужна для того, чтобы сбрасывать интервал, если пользователь выбрал раздел.

  useEffect(() => {
    if (!infoType) {
      runRickAnimation();
    } else {
      clearInterval(timerID);
      runRickAnimation();
    }
  }, [infoType]);

  //

  // Запуск анимации Рика.

  function runRickAnimation() {
    setTimerID(setInterval(() => {
      const randomMonolog = getRandomMonologForRick();
      $(rickAppearRef.current)
        .animate({ left: '-5.5%' }, 1000, () => $(rickAppearRef.current).find('div p').text(randomMonolog).animate({ opacity: 1 }, 400))
        .delay(2000)
        .animate({ left: '-1000%' }, 1000, () => $(rickAppearRef.current).find('div p').css({ opacity: 0 }));
    }, 15000));
  }

  //

  // Возвращает случайную строку в зависимости от того, просматривает ли пользователь какой-либо раздел или пока не выбрал ни один.

  function getRandomMonologForRick() {
    let data;
    if (!infoType) {
      data = monologData.dataNotLoaded;
    } else {
      data = monologData.dataLoaded;
    }
    return data[getRandomNumber(0, data.length - 1)];
  }

  //

  return (
    <div ref={rickAppearRef} className="rick-appear">
      <figure className="rick-appear__img-container">
        <img src="assets/img/load-info-delay.png" alt="Rick" />
      </figure>
      <div className="rick-appear__rick-monolog-container">
        <p className="rick-appear__rick-monolog" />
      </div>
    </div>
  );
}

RickAppear.propTypes = {
  infoType: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

RickAppear.defaultProps = {
  infoType: null,
};