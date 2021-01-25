// Определяет координаты элемента

export default function defineElementCoords(elem) {
  const elementInformation = elem.getBoundingClientRect();
  return {
    top: Math.round(elementInformation.top + window.pageYOffset),
    left: Math.round(elementInformation.left + window.pageXOffset),
  };
}

//
