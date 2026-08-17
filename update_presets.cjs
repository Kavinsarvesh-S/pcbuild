const fs = require('fs');
const file = './src/data/presets.ts';
let content = fs.readFileSync(file, 'utf8');

let imgCount = 1;

const getTier = (price) => {
  if (price < 80000) return 'Entry';
  if (price < 150000) return 'Mid-Range';
  return 'Enthusiast';
};

const updatedContent = content.replace(/(estimatedPrice:\s*(\d+),[\s\S]*?badge:\s*'[^']+',)/g, (match, fullMatch, price) => {
  const tier = getTier(parseInt(price));
  const additions = `\n    image: '/assest/${imgCount++}.png',\n    tier: '${tier}',`;
  return fullMatch + additions;
});

fs.writeFileSync(file, updatedContent);
console.log('Presets updated.');
