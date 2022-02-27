function firstNLetters(statistics, n) {
  return statistics.slice(0, n).map(x => x.letter);
}

export function getBestGuesses(statistics, suggestGuessesForNLetters, filteredWords) {
  const lettersForBestGuess = firstNLetters(statistics, suggestGuessesForNLetters);
  return filteredWords.filter(candidate => {
    const numberOfMatchingLetters = lettersForBestGuess.filter(letter => candidate.indexOf(letter) >= 0).length;
    return numberOfMatchingLetters >= 5;
  });
}

