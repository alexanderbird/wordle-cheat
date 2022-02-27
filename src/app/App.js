import { useState, useEffect } from 'preact/hooks';
import { WhatWeKnow } from './WhatWeKnow';
import { Documentation } from './Documentation';
import { GuessingHints } from './GuessingHints';
import { LetterStatistics } from './LetterStatistics';
import { BestGuesses } from './BestGuesses';
import { whatWeKnowTemplate, getFilteredWords, getStatistics, mergeWhatWeKnow, getBestGuesses } from './workflow/index';

export const App = () => {
  const [whatWeKnow, setWhatWeKnow] = useState(whatWeKnowTemplate);
  const updateWhatWeKnow = newInfo => setWhatWeKnow(mergeWhatWeKnow(whatWeKnow, newInfo));
  const { mustInclude, filteredWords, filterPattern } = getFilteredWords(whatWeKnow);
  const statistics = getStatistics(filteredWords);
  const [suggestGuessesForNLetters, setSuggestGuessesForNLetters] = useState(5);
  const bestGuesses = getBestGuesses(statistics, suggestGuessesForNLetters, filteredWords);

  return (
    <div>
      <h1>Wordle Cheat 😎</h1>
      <Documentation />
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
