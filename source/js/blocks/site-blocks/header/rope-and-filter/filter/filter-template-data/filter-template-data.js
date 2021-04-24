// Объект, который отражает возможности API в фильтрации.

const filterTemplateData = {
  character: {
    inputs: ['Name', 'Status', 'Species', 'Type', 'Gender'],
    placeholders: ['Rick', 'Unknown', 'Human', 'Superhuman', 'Male'],
  },
  location: {
    inputs: ['Name', 'Type', 'Dimension'],
    placeholders: ['Abadango', 'Planet', 'Unknown'],
  },
  episode: {
    inputs: ['Name', 'Episode'],
    placeholders: ['Rick Potion #9', 'S01E06'],
  },
};

export default filterTemplateData;
