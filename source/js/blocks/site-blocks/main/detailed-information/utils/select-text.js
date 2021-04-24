import getRandomNumber from '../../../../../utils/get-random-number';

// Создаю текст с подробной информацией

export default function selectText(text) {
  const chosenText = [];
  const keysCollection = Object.keys(text);
  const valuesCollection = Object.values(text);
  for (let i = 0; i < keysCollection.length; i += 1) {
    if (Array.isArray(valuesCollection[i])) {
      chosenText.push(`${valuesCollection[i][getRandomNumber(0, valuesCollection[i].length - 1)]}`);
    } else {
      const internalObject = text[keysCollection[i]];
      const introductoryText = internalObject.introductoryText[getRandomNumber(0, internalObject.introductoryText.length - 1)];
      const mainText = Array.isArray(internalObject.mainText) ? internalObject.mainText : internalObject.mainText.getMainText();
      chosenText.push(`${introductoryText} ${mainText[getRandomNumber(0, mainText.length - 1)]}`);
    }
  }
  return chosenText;
}

//
