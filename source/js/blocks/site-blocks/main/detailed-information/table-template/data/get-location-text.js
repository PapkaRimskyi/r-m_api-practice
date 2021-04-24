import selectText from '../../utils/select-text';

export default function getText(name, type, dimension, residents) {
  const residentWord = residents.length > 1 ? 'residents' : 'resident';
  const text = {
    nameText: [
      `Want to know about ${name}? Ok...`,
      `${name} - good choice.`,
      `Want more details about ${name}?`,
    ],
    typeText: {
      introductoryText: [
        'Firstly, let\'s figure out with type of this place.',
        'For start, you must to find out type of this location.',
        'Let\'s start from location type.',
      ],
      mainText: [
        `Hmm, let's see... Found! Location type - ${type.toLowerCase()}.`,
        `Well, well, well... and here is type - ${type.toLowerCase()}.`,
        `${type} - short and clear.`,
      ],
    },
    dimensionTypeText: {
      introductoryText: [
        'In next step we will know about dimension type.',
        'After a location type, i suppose you wanna know about dimension type.',
        'It\'s be a logical to know about dimension type after location type.',
      ],
      mainText: {
        unknownDimension: [
          'Can\'t tell you in which dimension this location.',
          `Dimension - ${dimension.toLowerCase()}.`,
          `Dimension for this location is ${dimension.toLowerCase()}.`,
          'Looks like we never ever know in which dimension this place.',
        ],
        withDimension: [
          `This location placed in ${dimension}.`,
          `Current dimension for this place is ${dimension}.`,
          `We can find this place in ${dimension}.`,
          `The location is in the ${dimension}.`,
        ],
        getMainText() {
          return dimension === 'unknown' ? this.withDimension : this.unknownDimension;
        },
      },
    },
    residentsText: {
      introductoryText: [
        'I\'m almost over with this flow of information. Last step - residents.',
        'Not tired of reading this information? This is last part about residents.',
        'Almost end. A little bit about residents.',
      ],
      mainText: {
        noResidents: [
          'No one lives here.',
          'Very quiet in this place...',
          'Here is 0 residents.',
          'There is no intelligent life here.',
        ],
        withResidents: [
          `${residents.length} ${residentWord} lives here.`,
          `${residents.length} ${residentWord} lives in this place.`,
          `In this place located ${residents.length} ${residentWord}.`,
          `Here is ${residents.length} ${residentWord}.`,
        ],
        getMainText() {
          return residents.length ? this.withResidents : this.noResidents;
        },
      },
    },
  };

  return selectText(text);
}
