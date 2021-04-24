import selectText from '../../utils/select-text';

export default function getText(episodeName, airData, episode, characters) {
  const text = {
    nameEpisodeText: [
      `Episode name - ${episodeName}.`,
      `Let's find out more about ${episodeName}.`,
      `This is ${episodeName} episode.`,
      `Have you seen this episode - ${episodeName}?`,
    ],
    airDateText: {
      introductoryText: [
        'When did this episode come out?',
        'Date of release this episode? I will answer to you...',
        'Here is information about episode release date.',
      ],
      mainText: [
        `He came out on ${airData}.`,
        `This episode was released on ${airData}.`,
        `Released in ${airData}.`,
        `Was published on ${airData}.`,
      ],
    },
    episodeNumberText: {
      introductoryText: [
        'Number of episode? Sure!',
        'Want to know about episode number?',
        'Now i will let you know about episode number.',
      ],
      mainText: [
        `Episode number is ${episode}.`,
        `Was released under ${episode}.`,
      ],
    },
    charactersText: {
      introductoryText: [
        'Now, at the end, let\'s count how many character been in this episode.',
        'Here is count of characters in episode.',
        'Time to find out characters count in this episode.',
      ],
      mainText: [
        `In this episode was ${characters.length} characters.`,
        `According to our calculations, in episode was ${characters.length} characters.`,
        `${characters.length} characters can be found in this episode.`,
      ],
    },
  };

  return selectText(text);
}
