import defineElementCoords from './define-element-coords';

// Скролит страницу до определенного элемента.

export default function scrollToElement(elem) {
  const { top, left } = defineElementCoords(elem);
  window.scrollTo(top, left);
}

//
