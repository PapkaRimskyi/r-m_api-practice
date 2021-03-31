import getRandomNumber from '../../../../../../utils/get-random-number';

// Для определения гендера

function defineGender(gender) {
  if (gender) {
    switch (gender.toLowerCase()) {
      case 'male':
        return { first: 'He', second: 'Him' };
      case 'female':
        return { first: 'She', second: 'Her' };
      default:
        return null;
    }
  }
  return { first: 'It', second: 'It' };
}

//

// Выбор текста локации в зависимости от условий

function chooseTextLocation(origin, location, text) {
  if (origin.name === 'unknown' && location.name === 'unknown') {
    return text.doubleUnknown[getRandomNumber(0, text.doubleUnknown.length - 1)];
  } if (origin.name === location.name) {
    return text.doubleSimilar[getRandomNumber(0, text.doubleSimilar.length - 1)];
  }
  return text.defaultText[getRandomNumber(0, text.defaultText.length - 1)];
}

//

// Текст для имени

function defineNameText(name) {
  const nameText = [
    `WoW. Who is that? Yea, this is a ${name}.`,
    `Hm... do we know who is that? Looks like this is a ${name}!`,
    `Well, well, well. Are you wanna know more about ${name}? Let's go!`,
    `This is ${name}.`,
    `Carefully, this is ${name}!`,
  ];
  return nameText[getRandomNumber(0, nameText.length - 1)];
}

//

// Текст для статуса персонажа (жив, мёртв, неизвестно)

function defineStatusText(status, gender) {
  const characterGender = defineGender(gender);

  function subText() {
    const text = [
      `If we actually starting to talk about ${characterGender.second.toLowerCase()}, you must to know character 'health' status.`,
      'And we starting from \'health\' status.',
      'We gonna start from \'health\' status.',
    ];
    return text[getRandomNumber(0, text.length - 1)];
  }

  const statusText = {
    alive: [
      `With this character all good, because ${characterGender.first.toLowerCase()} is ${status.toLowerCase()}.`,
      `Don't worry about ${characterGender.second.toLowerCase()}. ${characterGender.first} is ${status.toLowerCase()}.`,
      `${characterGender.first} ${status.toLowerCase()} and well.`,
      `Maybe, ${characterGender.first.toLowerCase()} is rest (no, ${characterGender.first.toLowerCase()} is not dead) somewhere.`,
      `Death did not came for ${characterGender.second.toLowerCase()}, that's why he is still ${status.toLowerCase()}.`,
    ],
    dead: [
      `Unfortunately, ${characterGender.first.toLowerCase()} is ${status.toLowerCase()}.`,
      `Death will come for all, but for ${characterGender.second.toLowerCase()} came faster.`,
      `At the present moment ${characterGender.first.toLowerCase()} is lies in the coffin. So let's say 'rest in peace'...or not?`,
      `Shortly, but clearly - ${characterGender.first.toLowerCase()} is ${status.toLowerCase()}.`,
      `Now ${characterGender.first.toLowerCase()} is looking at us from the other side (heaven or hell, it's up to yourself).`,
    ],
    unknown: [
      `Who knows, what's with ${characterGender.second.toLowerCase()}.`,
      `From the last meet, nobody saw ${characterGender.second.toLowerCase()}.`,
      `Maybe one day we finally find out what's happened to ${characterGender.second.toLowerCase()}. But now status is ${status.toLowerCase()}.`,
      `We should ask Rick and Morty authors to know what's happened with ${characterGender.second.toLowerCase()}. Because we - no idea.`,
      `${characterGender.first} fate remains a mystery to us.`,
    ],
  };
  return `${subText()} ${statusText[status.toLowerCase()][getRandomNumber(0, statusText[status.toLowerCase()].length - 1)]}`;
}

//

// Текст для описания вида и подтипа персонажа

function defineSpeciesAndType(gender, species, type) {
  const characterGender = defineGender(gender);

  function subText() {
    const text = [
      'Next is species and type information.',
      'A little bit about life form.',
    ];
    return text[getRandomNumber(0, text.length - 1)];
  }

  const speciesAndTypeText = {
    withoutType: [
      `${characterGender.first} is just a ${species.toLowerCase()}.`,
      `${characterGender.first} is one of ${species.toLowerCase()} type.`,
      `${characterGender.first} represents ${species.toLowerCase()} type.`,
    ],
    withType: [
      `${species} with special subtype - ${type.toLowerCase()}.`,
      `${characterGender.first} is ${species.toLowerCase()} with interesting subtype - ${type.toLowerCase()}.`,
    ],
  };
  return `${subText()} ${type ? speciesAndTypeText.withType[getRandomNumber(0, speciesAndTypeText.withType.length - 1)] : speciesAndTypeText.withoutType[getRandomNumber(0, speciesAndTypeText.withoutType.length - 1)]}`;
}

//

// Откуда и где был последний раз

function originAndPresentLocation(gender, origin, location) {
  const characterGender = defineGender(gender);

  function subText() {
    const text = [
      'Time to speak about born home and current home.',
      'We smoothly move to origin home and current.',
      `Now we going to know about character home: where ${characterGender.first.toLowerCase()} lived and lives.`,
    ];
    return text[getRandomNumber(0, text.length - 1)];
  }

  const originAndPresentText = {
    doubleUnknown: [
      'Home place of this character shroud by mystery. And what more interesting is we don\'t know the current location.',
      `Both of location (origin and current) are ${origin.location} to us.`,
      `${characterGender.first} is a mystery character, because we don't know where are ${characterGender.first.toLowerCase()} comes from and where is gone.`,
      'We don\'t know either the home place or the current location of this character.',
    ],
    doubleSimilar: [
      `Was born in ${origin.name} and still lives in.`,
      `Born and lives in same place - ${origin.name}.`,
      `Lives where ${characterGender.first.toLowerCase()} was born - ${origin.name}.`,
      `Home place is the same as the current - ${origin.name}.`,
    ],
    defaultText: [
      `${characterGender.first} is from ${origin.name} place and last appeared in ${location.name}.`,
      `${characterGender.first} was born in ${origin.name}. Last location is ${location.name}.`,
      `Home place for this character is ${origin.name}. Settled in the ${location.name}.`,
      `Native place for ${characterGender.second.toLowerCase()} is ${origin.name}. But then he resettled to ${location.name}.`,
    ],
  };
  return `${subText()} ${chooseTextLocation(origin, location, originAndPresentText)}`;
}

//

// Сколько раз персонаж был в эпизодах

function defineEpisodeText(gender, episode) {
  const characterGender = defineGender(gender);
  const episodeWord = episode.length > 1 ? 'episodes' : 'episode';

  function subText() {
    const text = [
      'Finally, we will find out, how many times this character be in episodes.',
      `And it's time to figure out, how many times ${characterGender.first.toLowerCase()} been in series.`,
      `Let's count in how many episodes ${characterGender.first.toLowerCase()} was.`,
    ];
    return text[getRandomNumber(0, text.length - 1)];
  }

  const episodeText = [
    `We can saw ${characterGender.second.toLowerCase()} in ${episode.length} ${episodeWord}.`,
    `${characterGender.first} appears in ${episode.length} ${episodeWord}.`,
    `${characterGender.first} was in ${episode.length} ${episodeWord}.`,
  ];
  return `${subText()} ${episodeText[getRandomNumber(0, episodeText.length - 1)]}`;
}

//

// Возвращаю функцию, которая возвращает массив из текстов.

export default function defineText(name, status, gender, species, type, origin, location, episode) {
  return [defineNameText(name), defineStatusText(status, gender), defineSpeciesAndType(gender, species, type), originAndPresentLocation(gender, origin, location), defineEpisodeText(gender, episode)];
}

//
