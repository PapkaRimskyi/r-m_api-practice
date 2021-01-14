import $ from 'jquery';

$(() => {
  // Когда документ полностью загружен, включится таймаут, который манипулирует порталом и, в конечном итоге, удаляет его.
  // Так же запускается анимация плавного появления заголовка

  setTimeout(() => {
    $('.entrance-block').addClass('entrance-block--bgc-change');
    $('.entrance-block__animation-gif').addClass('entrance-block__animation-gif--back-animation');
    setTimeout(() => {
      $('.entrance-block').remove();
      $('.header__welcome').find('span')
        .each((index, element) => setInterval(() => $(element).addClass('header__single-word--fade-in'), index * 500));
    }, 1000);
  }, 2000);

  //
});
