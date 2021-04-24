window.$(() => {
  // Когда документ полностью загружен, включается таймаут, который манипулирует порталом и, в конечном итоге, удаляет его.
  // Так же запускается анимация плавного появления заголовка.
  window.$('.entrance-block').addClass('entrance-block--bgc-change');
  document.body.style.overflow = 'hidden';
  window.$('.entrance-block__animation-gif').addClass('entrance-block__animation-gif--back-animation');
  const mainTimerID = setTimeout(() => {
    window.$('.entrance-block').remove();
    const wordCollection = window.$('.header__welcome').find('span');
    wordCollection
      .each((index, element) => {
        const timerID = setInterval(() => {
          window.$(element).animate({ opacity: 1 });
          if (index === wordCollection.length - 1) {
            window.$('#root').children().each((_, elem) => {
              window.$(elem).removeClass(`${Array.from(elem.classList).find((item) => item.includes('--hidden') && item)}`);
            });
            document.body.style.overflow = 'visible';
          }
          clearInterval(timerID);
        }, index * 500);
      });
    clearTimeout(mainTimerID);
  }, 800);
});
