import $ from 'jquery';

$(() => {
  // Когда документ полностью загружен, включится таймаут, который манипулирует порталом и, в конечном итоге, удаляет его.
  // Так же запускается анимация плавного появления заголовка

  setTimeout(() => {
    $('.entrance-block').addClass('entrance-block--bgc-change');
    $('.entrance-block__animation-gif').addClass('entrance-block__animation-gif--back-animation');
    setTimeout(() => {
      $('.entrance-block').remove();
      const wordCollection = $('.header__welcome').find('span');
      wordCollection
        .each((index, element) => {
          const timerID = setInterval(() => {
            clearInterval(timerID);
            $(element).addClass('header__single-word--fade-in');
            if (index === wordCollection.length - 1) {
              $('#root [class$=hidden]').each((_, elem) => {
                $(elem).removeClass(`${Array.from(elem.classList).find((item) => item.includes('--hidden') && item)}`);
              });
            }
          }, index * 500);
        });
    }, 1000);
  }, 2000);

  //
});
