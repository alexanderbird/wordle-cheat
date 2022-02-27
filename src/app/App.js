import { useState, useEffect } from 'preact/hooks';
import { WhatWeKnow } from './WhatWeKnow';
import { GuessingHints } from './GuessingHints';
import { LetterStatistics } from './LetterStatistics';
import { BestGuesses } from './BestGuesses';
import { wordsAllMungedTogether } from '../data/words.json';
const WORDS = wordsAllMungedTogether.replace(/...../g, '$&-').replace(/-$/, '').split('-')
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const App = () => {
  // Phase 1
  const [whatWeKnow, setWhatWeKnow] = useState({
    correct: [],
    incorrect: [],
    wrongSpot: [[],[],[],[],[]]
  });
  function updateWhatWeKnow(newInfo) {
    setWhatWeKnow({
      correct: mergeArrays(whatWeKnow.correct, newInfo.correct),
      incorrect: newInfo.incorrect || whatWeKnow.incorrect,
      wrongSpot: mergeArrays(whatWeKnow.wrongSpot, newInfo.wrongSpot)
    });
  }

  // Phase Two
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

  // Phase Three
  const statisticsObject = {};
  filteredWords
    .map(word => Array.from(new Set(word.split(''))))
    .forEach(letters => {
      letters.forEach(letter => {
        statisticsObject[letter] = statisticsObject[letter] || { letter, count: 0 };
        statisticsObject[letter].count += 1;
      });
    });

  const statistics = Object.values(statisticsObject).sort((lhs, rhs) => rhs.count - lhs.count);

  // Phase Four
  function firstNLetters(n) {
    return statistics.slice(0, n).map(x => x.letter);
  }

  const [bestGuesses, setBestGuesses] = useState([]);

  const [suggestGuessesForNLetters, setSuggestGuessesForNLetters] = useState(5);

  useEffect(() => {
    const lettersForBestGuess = firstNLetters(suggestGuessesForNLetters);
    const bestGuesses = filteredWords.filter(candidate => {
      const numberOfMatchingLetters = lettersForBestGuess.filter(letter => candidate.indexOf(letter) >= 0).length;
      return numberOfMatchingLetters >= 5;
    });
    setBestGuesses(bestGuesses);
  }, [whatWeKnow, suggestGuessesForNLetters]);

  return (
    <div>
      <h1>Wordle Cheat 😎</h1>
      <p>
        Tenets:
        <ul>
          <li><b>No reverse engineering:</b> this cheating tool does not use any information taken directly or indirectly from inspecting the Wordle source code</li>
          <li><b>Assist but don't automate:</b> this tool should help you cheat but not solve the Wordle automatically</li>
        </ul>
      </p>
      <p>
        Algorithm:
        <ol>
          <li><b>Bisect the answer space:</b> first, guess a word that would confirm or eliminate the largest possible set of words (see "Bisecting Guesses")</li>
          <li><b>Update the word list:</b> based on what you learned from the first guess, reduce the total word list</li>
          <li><b>Repeat</b> until you've won</li>

        </ol>
      </p>
      <p>
        Acknowledgements:
        <ul>
          <li>The word list is adapted from <a href="https://github.com/dwyl/english-words/">dwyl/english-words</a> which is published
in the public domain (via <a href="https://github.com/dwyl/english-words/blob/master/LICENSE.md">the Unlicense</a>))</li>
        </ul>
      </p>
      <article id='main'>
        <WhatWeKnow updateWhatWeKnow={updateWhatWeKnow} />
        <GuessingHints mustInclude={mustInclude} filteredWords={filteredWords} filterPattern={filterPattern} />
        <LetterStatistics statistics={statistics} suggestGuessesForNLetters={suggestGuessesForNLetters} />
        <BestGuesses bestGuesses={bestGuesses} suggestGuessesForNLetters={suggestGuessesForNLetters} setNumberOfLetters={setSuggestGuessesForNLetters}/>
      </article>
      <footer><a href="https://github.com/alexanderbird/wordle-cheat">Open source on GitHub</a></footer>
    </div>
  );
}

function mergeArrays(one, two) {
  if (!two) return one;
  const result = [];
  for (let i = 0; i < Math.max(one.length, two.length); i++) {
    result[i] = two[i] || one[i];
  }
  return result;
}
