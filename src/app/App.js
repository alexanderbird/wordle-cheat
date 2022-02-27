import { useState, useEffect } from 'preact/hooks';
import { WhatWeKnow } from './WhatWeKnow';
import { Documentation } from './Documentation';
import { GuessingHints } from './GuessingHints';
import { LetterStatistics } from './LetterStatistics';
import { BestGuesses } from './BestGuesses';
import { whatWeKnowTemplate, getFilteredWords, getStatistics, mergeWhatWeKnow, getBestGuesses } from './workflow/index';

export const App = () => {
  const [whatWeKnow, setWhatWeKnow] = useState(whatWeKnowTemplate);
  const [isComputing, setIsComputing ] = useState(true);
  const updateWhatWeKnow = newInfo => {
    setIsComputing(true);
    setWhatWeKnow(mergeWhatWeKnow(whatWeKnow, newInfo));
  }
  const [state, setState] = useState({
    mustInclude: [],
    filteredWords: [],
    filterPattern: '',
    statistics: [],
    suggestGuessesForNLetters: 5,
    bestGuesses: []
  });
  const { mustInclude, filteredWords, filterPattern, statistics, suggestGuessesForNLetters, bestGuesses } = state;
  useEffect(() => {
    console.log('update');
    const { mustInclude, filteredWords, filterPattern } = getFilteredWords(whatWeKnow);
    const statistics = getStatistics(filteredWords);
    const bestGuesses = getBestGuesses(statistics, suggestGuessesForNLetters, filteredWords);
    setState({ mustInclude, filteredWords, filterPattern, statistics, suggestGuessesForNLetters, bestGuesses  });
    setIsComputing(false);
  }, [whatWeKnow]);

  const setSuggestGuessesForNLetters = n => setState(current => ({ ...current, suggestGuessesForNLetters: n }));

  return (
    <div>
      <h1>Wordle Cheat 😎</h1>
      <Documentation />
      <article id='main'>
        <WhatWeKnow updateWhatWeKnow={updateWhatWeKnow} />
        <GuessingHints mustInclude={mustInclude} filteredWords={filteredWords} filterPattern={filterPattern} isComputing={isComputing}/>
        <LetterStatistics statistics={statistics} suggestGuessesForNLetters={suggestGuessesForNLetters} isComputing={isComputing}/>
        <BestGuesses bestGuesses={bestGuesses} suggestGuessesForNLetters={suggestGuessesForNLetters} setNumberOfLetters={setSuggestGuessesForNLetters} isComputing={isComputing} />
      </article>
      <footer><a href="https://github.com/alexanderbird/wordle-cheat">Open source on GitHub</a></footer>
    </div>
  );
}
