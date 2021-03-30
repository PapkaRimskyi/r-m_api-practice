import getRandomNumber from '../../../../../../utils/get-random-number';

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

function defineNameText(name) {
  const nameText = [
    `WoW. Who is that? Yea, this is a ${name}.`,
    `Hm... do we know who is that? Looks like this is a ${name}!`,
    `Well, well, well. Are you wanna know more about ${name}?`,
    `This is ${name}.`,
    `Carefully, this is ${name}!`,
  ];
  return nameText[getRandomNumber(0, nameText.length - 1)];
}

function defineStatusText(status, gender) {
  const characterGender = defineGender(gender);
  const statusText = {
    alive: [
      `With this character all good, because ${characterGender.first.toLowerCase()} is ${status.toLowerCase()}.`,
      `Don't worry about ${characterGender.second.toLowerCase()}. ${characterGender.first} is ${status.toLowerCase()}.`,
      `${status} and well.`,
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
  return statusText[status.toLowerCase()][getRandomNumber(0, statusText[status.toLowerCase()].length - 1)];
}

function defineSpeciesAndType(gender, species, type) {
  const characterGender = defineGender(gender);
  const speciesAndTypeText = {
    withoutType: [
      `${characterGender.first} is just a ${species.toLowerCase()}.`,
      `One of ${species.toLowerCase()} type.`,
      `Represents ${species.toLowerCase()} type.`,
    ],
    withType: [
      `${species} with special subtype - ${type.toLowerCase()}.`,
      `${characterGender.first} is ${species.toLowerCase()} with interesting subtype - ${type.toLowerCase()}.`,
    ],
  };
  return type
    ? speciesAndTypeText.withType[getRandomNumber(0, speciesAndTypeText.withType.length - 1)]
    : speciesAndTypeText.withoutType[getRandomNumber(0, speciesAndTypeText.withoutType.length - 1)];
}

// function originAndPresentLocation(origin, location) {
//   const characterGender = defineGender(gender);
//   const originAndPresentText = {
//     samePlace: [
//       `${characterGender.first} was born in ${origin.name}`,

//     ]
//   }
// }

function defineEpisodeText(gender, episode) {
  const characterGender = defineGender(gender);
  const episodeWord = episode.length > 1 ? 'episodes' : 'episode';
  const episodeText = [
    `We can saw ${characterGender.second.toLowerCase()} in ${episode.length} ${episodeWord}`,
    `This character appears in ${episode.length} ${episodeWord}`,
    `${characterGender.first} was in ${episode.length} ${episodeWord}`,
  ];
  return episodeText[getRandomNumber(0, episodeText.length - 1)];
}

export default function defineText(name, status, gender, species, type, episode) {
  return [defineNameText(name), defineStatusText(status, gender), defineSpeciesAndType(gender, species, type), defineEpisodeText(gender, episode)];
}
