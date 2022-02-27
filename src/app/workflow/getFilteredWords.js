import { wordsAllMungedTogether } from '../../data/words.json';
const WORDS = wordsAllMungedTogether.replace(/...../g, '$&-').replace(/-$/, '').split('-')

export function getFilteredWords(whatWeKnow) {
  function characterClassFor(i) {
    const notThese = [...whatWeKnow.incorrect, ...whatWeKnow.wrongSpot[i]];
    if (notThese.length) {
      return `[^${notThese.join('')}]`;
    }
    return '.';
  }
  const filterPatternParts = [];
  for (let i = 0; i < 5; i++) {
    filterPatternParts[i] = whatWeKnow.correct[i] || characterClassFor(i);
  }
  const filterPattern = filterPatternParts.join('');
  const filterRegExp = new RegExp(filterPattern);
  const mustInclude = Array.from(new Set(whatWeKnow.wrongSpot.flat()));
  const filteredWords = WORDS.filter(candidate =>
    candidate.match(filterRegExp)
    && mustInclude.every(letter => candidate.indexOf(letter) >= 0));
  return { filterPattern, mustInclude, filteredWords };
}

