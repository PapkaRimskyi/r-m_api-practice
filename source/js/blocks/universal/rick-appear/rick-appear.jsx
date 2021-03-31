import React, { useEffect, useRef } from 'react';

import getRandomNumber from '../../../utils/get-random-number';

import monologData from './monolog-data/monolog-data';

import { ANIMATION_DELAY } from '../../../variables';

import '../../../../img/load-info-delay.png';

export default function RickAppear() {
  const rickAppearRef = useRef(null);

  // Запускаю анимацию после монтирования

  useEffect(() => {
    runRickAnimation();
  }, []);

  //

  // Запуск анимации Рика.

  function runRickAnimation() {
    setInterval(() => {
      const randomMonolog = getRandomMonologForRick();
      $(rickAppearRef.current)
        .animate({ left: '-5.5%' }, 1000, () => $(rickAppearRef.current).find('div p').text(randomMonolog).animate({ opacity: 1 }, 400))
        .delay(2000)
        .animate({ left: '-1000%' }, 1000, () => $(rickAppearRef.current).find('div p').css({ opacity: 0 }));
    }, ANIMATION_DELAY);
  }

  //

  // Возвращает случайную строку.

  function getRandomMonologForRick() {
    return monologData[getRandomNumber(0, monologData.length - 1)];
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
